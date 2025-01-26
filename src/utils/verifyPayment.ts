import spfactory from 'shurjopay';
import config from '../config/config';
const shurjopay = spfactory();
shurjopay.config(
  config.SP_ENDPOINT as string,
  config.SP_USERNAME as string,
  config.SP_PASSWORD as string,
  config.SP_PREFIX as string,
  config.SP_RETURN_URL as string,
);
export const verifyPayment = async (orderId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      orderId,
      (response_data: any) => {
        resolve(response_data);
      },
      (error: any) => {
        reject(error);
      },
    );
  });
};
