import { _mock } from "./_mock";

// ----------------------------------------------------------------------

export const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'violet', label: 'Violet' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '8.5', label: '8.5' },
  { value: '9', label: '9' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
  { value: '10.5', label: '10.5' },
  { value: '11', label: '11' },
  { value: '11.5', label: '11.5' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];
// Added by Shakirat
export const PRODUCT_STATUS_OPTIONS = [
  { value: 'text', label: 'Text' },
  { value: 'active', label: 'Active' },
  { value: 'retired', label: 'Retired' },
];


export const _products = [...Array(15)].map((_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  // const items =
  //   (index % 2 && ITEMS.slice(0, 1)) ||
  //   (index % 3 && ITEMS.slice(1, 3)) ||
  //   ITEMS;

  // const totalQuantity = items.reduce(
  //   (accumulator, item) => accumulator + item.quantity,
  //   0
  // );

  // const subTotal = items.reduce(
  //   (accumulator, item) => accumulator + item.price * item.quantity,
  //   0
  // );

  // const totalAmount = subTotal - shipping - discount + taxes;

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: "192.158.1.38",
  };

  const delivery = {
    shipBy: "DHL",
    speedy: "Standard",
    trackingNumber: "SPX037739199373",
  };

  const history = {
    orderTime: _mock.time(1),
    paymentTime: _mock.time(2),
    deliveryTime: _mock.time(3),
    completionTime: _mock.time(4),
    timeline: [
      { title: "Delivery successful", time: _mock.time(1) },
      { title: "Transporting to [2]", time: _mock.time(2) },
      { title: "Transporting to [1]", time: _mock.time(3) },
      {
        title: "The shipping unit has picked up the goods",
        time: _mock.time(4),
      },
      { title: "Order has been created", time: _mock.time(5) },
    ],
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: _mock.time(index),
    taxes,
    // items,
    history,
    // subTotal,
    shipping,
    discount,
    customer,
    delivery,
    // totalAmount,
    // totalQuantity,
    shippingAddress: {
      fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
      phoneNumber: "365-374-4961",
    },
    payment: {
      cardType: "mastercard",
      cardNumber: "**** **** **** 5678",
    },
    status:
      (index % 2 && "completed") ||
      (index % 3 && "pending") ||
      (index % 4 && "cancelled") ||
      "refunded",
    corp_status:
      (index % 2 && "text") ||
      (index % 3 && "active") ||
      "retired",
  };
});


// export const PRODUCT_PUBLISH_OPTIONS = [
//   {
//     value: 'published',
//     label: 'Published',
//   },
//   {
//     value: 'draft',
//     label: 'Draft',
//   },
  
// ];
export const PRODUCT_PUBLISH_OPTIONS = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  {
    group: 'Clothing',
    classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'],
  },
  {
    group: 'Tailored',
    classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'],
  },
  {
    group: 'Accessories',
    classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'],
  },
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];
