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
export const surjoPaymentCreate = async (paymentData: {
  amount: number;
  order_id: string;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  customer_city: string;
  client_ip: string;
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentData,
      (response_data: any) => {
        resolve(response_data);
      },
      (error: any) => {
        reject(error); 
      },
    );
  });
};
