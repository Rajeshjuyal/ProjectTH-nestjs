import {
  Injectable,
  HttpStatus,
  Catch,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsModel } from '../notifications/notifications.model';

import {
  UsersDTO,
  CredentialsDTO,
  ChangePasswordDTO,
  PasswordResetDTO,
  UsersUpdateDTO,
  DeviceTokenDTO,
  CredentialsMobileDTO,
  DeliverBoyStatusDTO,
  PushNotificationDTO,
} from './users.model';
import { CommonResponseModel, globalConfig } from '../utils/app-service-data';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../utils/auth.service';
import * as uuid from 'uuid/v1';
import { UploadService } from '../upload/upload.service';

import * as geolib from 'geolib';
const GeneralService = require('../utils/general-service');
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<any>,
    private jwtService: JwtService,
    private authService: AuthService,
    private utilService: UploadService,
  ) {}

  // get's user information
  public async getUserInformation(id: string): Promise<CommonResponseModel> {
    // console.log("id",id);
    const userInfo = await this.userModel.findById(id, '-password -salt');
    const userCount: number = await this.userModel.countDocuments();
    if (userInfo) {
      return {
        response_code: HttpStatus.OK,
        response_data: {
          userInfo,
          userCount,
        },
      };
    } else {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'User not found',
      };
    }
  }

  // get's admin settings
  public async getAdminSettings(): Promise<CommonResponseModel> {
    const settings = await this.userModel.findOne(
      { role: 'Admin' },
      'deliveryCharge deliveryDistanceUnit freeDeliveryDistance location',
    );
    if (settings) {
      return { response_code: HttpStatus.OK, response_data: settings };
    } else {
      return {
        response_code: HttpStatus.OK,
        response_data: 'Could not fetch admin settings',
      };
    }
  }

  // registers a new user
  public async registerNewUser(
    userData: UsersDTO,
  ): Promise<CommonResponseModel> {
    if (
      userData.role === 'User' ||
      userData.role === 'Admin' ||
      userData.role === 'Delivery Boy'
    ) {
      userData.email = userData.email.toLowerCase();
      const check = await this.userModel.findOne({ email: userData.email });
      if (check) {
        console.log('User exists');
        return {
          response_code: HttpStatus.UNAUTHORIZED,
          response_data: `User with email ${
            userData.email
          } is already registered`,
        };
      }
      if (userData.role === 'Admin') {
        const checkIfAdminExist = await this.userModel.findOne({
          role: 'Admin',
        });
        if (checkIfAdminExist) {
          return {
            response_code: HttpStatus.BAD_REQUEST,
            response_data: 'An admin account exist.',
          };
        }
      }
      const { salt, hashedPassword } = await this.authService.hashPassword(
        userData.password,
      );
      console.log('Getting created');
      userData.salt = salt;
      userData.password = hashedPassword;
      userData.registrationDate = Date.now();
      userData.emailVerified = userData.role === 'User' ? false : true;
      userData.totalLoyaltyPoints = 0;
      userData.loyaltyPoints = [];
      userData.loyaltyPoints.push({ point: 0 });
      const verificationId = uuid();
      userData.verificationId = verificationId;
      const response = await this.userModel.create(userData);
      console.log('CReated');
      if (response._id) {
        const { body, subject, htmlData } = this.getEmailVerificationFields(
          verificationId,
        );
        const emailRes = await this.utilService.sendEmail(
          userData.email,
          subject,
          body,
          htmlData,
        );
        console.log(emailRes);
        this.sendRegisterMail(userData);
        if (emailRes && emailRes.length > 0) {
          return {
            response_code: HttpStatus.CREATED,
            response_data:
              'Account created successfully. A verification link is sent your email, Please verify your email',
          };
        } else {
          return {
            response_code: HttpStatus.CREATED,
            response_data: { message: 'Account created successfully' },
          };
        }
      }
    } else {
      return {
        response_code: HttpStatus.BAD_REQUEST,
        response_data: 'Role Should be User Or Delivery Boy',
      };
    }
  }

  //Admin create the another Role Like DeliveryBoys || Mangers in future
  public async adminCreateNewRole(
    userData: UsersDTO,
  ): Promise<CommonResponseModel> {
    try {
      if (
        userData.role === 'User' ||
        userData.role === 'Delivery Boy' ||
        userData.role === 'Manager'
      ) {
        userData.email = userData.email.toLowerCase();
        const check = await this.userModel.findOne({
          $or: [
            { email: userData.email },
            { mobileNumber: userData.mobileNumber },
          ],
        });
        if (check) {
          return {
            response_code: HttpStatus.UNAUTHORIZED,
            response_data: `${userData.role} with ${userData.email}/${
              userData.mobileNumber
            } is already registered`,
          };
        }
        const { salt, hashedPassword } = await this.authService.hashPassword(
          userData.password,
        );
        userData.salt = salt;
        userData.password = hashedPassword;
        userData.registrationDate = Date.now();
        userData.emailVerified = true;
        const verificationId = uuid();
        userData.verificationId = verificationId;
        const response = await this.userModel.create(userData);
        return {
          response_code: HttpStatus.CREATED,
          response_data: { message: 'Account Created SuccessFully' },
        };
      } else {
        return {
          response_code: HttpStatus.BAD_REQUEST,
          response_data: 'Role Should be User Or Delivery Boy',
        };
      }
    } catch (e) {
      return {
        response_code: HttpStatus.BAD_REQUEST,
        response_data: e.message,
      };
    }
  }

  // updates user information
  public async updateUserInfo(
    userId: string,
    userData: UsersUpdateDTO,
  ): Promise<CommonResponseModel> {
    const res = await this.userModel.findByIdAndUpdate(userId, userData);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Profile updated successfully',
    };
  }

  // get email verification fields
  private getEmailVerificationFields(verificationId: string) {
    console.log('MAIL CALLED !');
    const body: string =
      'Registration has been successful. Please follow the link to verify your email';
    const subject: string = 'Account verification';
    let htmlData: string = '';
    let url: string = '';
    console.log('MAIL CREATED !');
    if (process.env.NODE_ENV === 'production') {
      url =
        process.env.BASE_URL_PRODUCTION +
        `/users/verify/email/${verificationId}`;
      htmlData = `    <p>${body}</p><br>
                            <a href="${url}" target="_blank">VERIFY ACCOUNT</a>
                        `;
    } else {
      const localIp = globalConfig.localIp;
      url =
        process.env.BASE_URL_TESTING + `/users/verify/email/${verificationId}`;
      htmlData = `    <p>${body}</p><br>
                            <a href="${url}" target="_blank">VERIFY ACCOUNT</a>
                        `;
    }
    console.log('MAIL RETURN !');
    return { body, subject, htmlData };
  }

  // validates user's credential and sends token and id as response
  public async validateUserCredentials(
    credentials: CredentialsDTO,
  ): Promise<CommonResponseModel> {
    credentials.email = credentials.email.toLowerCase();
    const userData: UsersDTO = await this.userModel.findOne({
      email: credentials.email,
    });
    console.log('CredentialplayerId-------------', credentials.playerId);
    if (!userData) {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: `User with email ${credentials.email} is not registered`,
      };
    }
    const passwordMatch = await this.authService.verifyPassword(
      credentials.password,
      userData.password,
    );
    const body = {
      token: null,
      _id: null,
      role: null,
    };
    if (passwordMatch) {
      if (passwordMatch && userData.emailVerified) {
        body._id = userData._id;
        body.token = await this.authService.generateAccessToken(userData._id);
        body.role = userData.role;
        const userInfo = await this.userModel.findOne({
          email: credentials.email,
        });
        userInfo.playerId = credentials.playerId;
        console.log('payerId----------------', userInfo.playerId);
        const res = await this.userModel.findByIdAndUpdate(
          userInfo._id,
          userInfo,
        );
        return { response_code: HttpStatus.OK, response_data: body };
      } else {
        const verificationId = uuid();
        userData.verificationId = verificationId;
        const setVerificationId = await this.userModel.findByIdAndUpdate(
          userData._id,
          userData,
        );
        const { body, subject, htmlData } = this.getEmailVerificationFields(
          verificationId,
        );
        const emailRes = await this.utilService.sendEmail(
          userData.email,
          subject,
          body,
          htmlData,
        );
        if (emailRes && emailRes.length > 0) {
          return {
            response_code: HttpStatus.UNAUTHORIZED,
            response_data:
              'Your account is not verified. A verification link is sent your email, Please verify your email',
          };
        } else {
          return {
            response_code: HttpStatus.UNAUTHORIZED,
            response_data: 'Could not send verification email',
          };
        }
      }
    } else {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'Enter a valid password',
      };
    }
  }

  // verifies user's email
  public async verifyEmail(
    verificationId: string,
  ): Promise<CommonResponseModel> {
    const userInfo = (await this.userModel.findOne({
      verificationId,
    })) as UsersDTO;
    if (userInfo) {
      userInfo.emailVerified = true;
      const res = await this.userModel.findByIdAndUpdate(
        userInfo._id,
        userInfo,
      );
      return {
        response_code: HttpStatus.OK,
        response_data: 'Email verified successfully',
      };
    } else {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'Could not verify user. Invalid token',
      };
    }
  }

  // get's list of all users
  public async getListOfUsers(
    page: number,
    limit: number,
  ): Promise<CommonResponseModel> {
    const users = await this.userModel
      .find({ role: 'User' })
      .limit(limit)
      .skip(page * limit - limit);
    const userCount = await this.userModel.countDocuments({ role: 'User' });
    return {
      response_code: HttpStatus.OK,
      response_data: { users, userCount },
    };
  }

  //Get Admin infomation for store infomation
  public async getAdminInfomation(): Promise<CommonResponseModel> {
    const res = await this.userModel.findOne(
      { role: 'Admin' },
      'firstName lastName email mobileNumber freeDeliveryDistance deliveryChargedeliveryDistanceUnit location',
    );
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }

  // change password
  public async changePassword(
    user: UsersDTO,
    passwordData: ChangePasswordDTO,
  ): Promise<CommonResponseModel> {
    const passwordMatch = await this.authService.verifyPassword(
      passwordData.currentPassword,
      user.password,
    );
    if (!passwordMatch) {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'You have entered an incorrect current password',
      };
    } else {
      const { salt, hashedPassword } = await this.authService.hashPassword(
        passwordData.newPassword,
      );
      user.salt = salt;
      user.password = hashedPassword;
      const response = await this.userModel.findByIdAndUpdate(user._id, user);
      return {
        response_code: HttpStatus.OK,
        response_data: 'You have successfully changed your password',
      };
    }
  }

  // checks email exist or not, if exist sends OTP to the email
  public async validateEmail(email: string): Promise<CommonResponseModel> {
    email = email.toLowerCase();
    const userData = (await this.userModel.findOne({ email })) as UsersDTO;
    if (!userData) {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: `User with email ${email} doesnt exist`,
      };
    } else {
      const randomNumber = Math.floor(9000 * Math.random()) + 1000;
      userData.otp = randomNumber;
      console.log('OTP', randomNumber);
      const res = await this.userModel.findByIdAndUpdate(
        userData._id,
        userData,
      );
      const body = `Dear user, your One time Password (OTP) to reset your password is ${randomNumber}. The OTP is valid for 5 minutes.`;
      const subject = 'Password reset OTP';
      const emailRes = await this.utilService.sendEmail(
        userData.email,
        subject,
        body,
      );
      if (emailRes && emailRes.length > 0) {
        const token = await this.authService.generateAccessToken(
          userData._id,
          'email',
        );
        return {
          response_code: HttpStatus.OK,
          response_data: {
            message: `We have sent an OTP to ${email}. Please verify the OTP to reset your password`,
            token,
          },
        };
      } else {
        return {
          response_code: HttpStatus.BAD_REQUEST,
          response_data:
            'Could not send OTP to the registered email, Please try again',
        };
      }
    }
  }

  // verifies OTP
  public async verifyOTP(
    userId: string,
    otp: number,
  ): Promise<CommonResponseModel> {
    const userInfo = await this.userModel.findById(userId);
    if (userInfo.otp !== otp) {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'You have entered an incorrect OTP',
      };
    } else {
      const token = await this.authService.generateAccessToken(
        userInfo._id,
        'otp',
      );
      return {
        response_code: HttpStatus.OK,
        response_data: { message: 'OTP verified successfully', token },
      };
    }
  }

  // resets password
  public async resetPassword(
    userId: string,
    passwordData: PasswordResetDTO,
  ): Promise<CommonResponseModel> {
    const userInfo = (await this.userModel.findById(userId)) as UsersDTO;
    const { salt, hashedPassword } = await this.authService.hashPassword(
      passwordData.password,
    );
    userInfo.salt = salt;
    userInfo.password = hashedPassword;
    const res = await this.userModel.findByIdAndUpdate(userId, userInfo);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Password has been reset successfully',
    };
  }

  // checks whether the token is valid or not
  public async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  // sets user's device token
  public async setDeviceToken(
    user: UsersDTO,
    fcmData: DeviceTokenDTO,
  ): Promise<CommonResponseModel> {
    if (user.role !== 'User') {
      return {
        response_code: HttpStatus.UNAUTHORIZED,
        response_data: 'Sorry !!, you are not allowed to access this api',
      };
    }
    const response = await this.utilService.sendNotification(fcmData.fcmToken);
    const subsRespo = await this.utilService.subscribeToAllUsersTopic(
      fcmData.fcmToken,
      'allUsers',
    ); //here user push notification for all user
    if (response.response_code === 200) {
      user['fcmToken'] = fcmData.fcmToken;
      const res = await this.userModel.findByIdAndUpdate(user._id, user);
      return {
        response_code: HttpStatus.OK,
        response_data: 'Firebase notification registration successful',
      };
    } else {
      return response;
    }
  }

  //Get all users List
  public async getAlluserList(): Promise<CommonResponseModel> {
    const resdata = await this.userModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: resdata,
    };
  }

  //get user list By id
  public async findUserById(id: string): Promise<CommonResponseModel> {
    const res = await this.userModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }

  //user graph data for ploating
  public async getUserCount(): Promise<CommonResponseModel> {
    const ressult = await this.userModel.aggregate(
      [
        { $match: {} },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              date: { $dayOfMonth: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
      ],
      function(err, result) {
        if (err) {
          console.log(err);
          return;
        } else {
          let dateArr = [],
            countArr = [];
          result.forEach(function(data) {
            if (data._id && data._id.year) {
              dateArr.push(
                data._id.date + '/' + data._id.month + '/' + data._id.year,
              );
              countArr.push(data.total);
            }
          });
        }
      },
    );
    return {
      response_code: HttpStatus.OK,
      response_data: ressult,
    };
  }

  //send pushNotification to All users.
  public async pushNotificatioalToAllusers(
    data: PushNotificationDTO,
  ): Promise<CommonResponseModel> {
    try {
      const userData = await this.userModel.find({}, 'playerId');
      console.log('USER DATA : ' + userData + ' DATA : ' + data);
      let deviceArr: any = [];
      (deviceArr = userData.map(element => element.playerId)),
        console.log('Device DATA : ' + deviceArr);
      deviceArr.forEach(function(value) {
        GeneralService.orderPushNotification([value], data.mssg, data.title);
      });

      return {
        response_code: HttpStatus.OK,
        response_data: 'successfully sended to all Users',
      };
    } catch (e) {
      return {
        response_code: HttpStatus.BAD_REQUEST,

        response_data: e.message,
      };
    }
  }
  public async sendRegisterMail(register): Promise<CommonResponseModel> {
    let res = await this.utilService.sendRegisterMail(register);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
