export type ShippingOptions = {
  destination: {
    zip_code: string;
    city: {
      id: string;
      name: string;
    };
    state: {
      id: string;
      name: string;
    };
    country: {
      id: string;
      name: string;
    };
    extended_attributes: {
      address: string;
      zip_code_type: {
        type: string;
        description: string;
      };
      city_type: string;
      city_name: string;
      neighborhood: string;
      status: string;
    };
  };
  buyer: null;
  options: {
    id: number;
    option_hash: string;
    name: string;
    currency_id: string;
    base_cost: number;
    cost: number;
    list_cost: number;
    display: string;
    shipping_method_id: number;
    shipping_method_type: string;
    shipping_option_type: string;
    estimated_delivery_time: {
      type: string;
      date: string;
      unit: string;
      offset: {
        date: null;
        shipping: null;
      };
      time_frame: {
        from: null;
        to: null;
      };
      pay_before: null;
      shipping: number;
      handling: number;
      schedule: null;
    };
    discount: {
      promoted_amount: number;
      rate: number;
      type: string;
      show_loyal_benefit: boolean;
    };
  }[];
  custom_message: {
    display_mode: null;
    reason: string;
  };
};
