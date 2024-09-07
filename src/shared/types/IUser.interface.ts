interface IUser {
  email: string;
  phone: string;
  name: string;
  signUpDate: Date;
  profilePicture: string;
  totalCredit: number;
  plan: string;
  balanceCredit: number;
  usedCredit: number;
  usageHistory: {
    productTags: number;
    seoTags: number;
    labelTags: number;
    titleTags: number;
    descriptionTags: number;
    imageGeneration: number;
    backgroundRemoval: number;
    tryOn: number;
    ethnicitySwap: number;
  };
}

export { IUser };
