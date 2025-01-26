declare module 'shurjopay' {
    interface PaymentRequest {
      amount: number;
      order_id: string;
      customer_name: string;
      customer_address: string;
      client_ip: string;
      customer_phone: string;
      customer_city: string;
    }
  
    interface ResponseData {
      checkout_url: string;
      order_id: string;
      status: string;
      message: string;
    }
  
    type PaymentCallback = (response_data: ResponseData) => void;
    type ErrorCallback = (error: any) => void;
  
    interface ShurjoPay {
      config(
        endpoint: string,
        username: string,
        password: string,
        prefix: string,
        return_url: string
      ): void;
  
      makePayment(
        paymentRequest: PaymentRequest,
        successCallback: PaymentCallback,
        errorCallback: ErrorCallback
      ): void;
  
      verifyPayment(
        order_id: string,
        successCallback: PaymentCallback,
        errorCallback: ErrorCallback
      ): void;
    }
  
    const shurjopay: () => ShurjoPay;
    export = shurjopay;
  }
  