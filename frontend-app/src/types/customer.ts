// نقش‌های کاربری مشتری (فعلاً یک نقش داریم، اما برای توسعه‌پذیری آینده تعریف می‌شود)
export type CustomerRole = "Customer";

// اینترفیس کاربر مشتری
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: CustomerRole;
}

// اعتبارنامه‌های ورود (مشترک با ادمین، اما تایپ جدا برای توسعه‌پذیری)
export interface LoginCredentials {
  email: string;
  password: string;
}

// داده‌های مورد نیاز برای ثبت‌نام
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// پاسخ سرور پس از لاگین یا ثبت‌نام موفق
export interface AuthResponse {
  customer: Customer;
  token: string;
  refreshToken?: string;
}
