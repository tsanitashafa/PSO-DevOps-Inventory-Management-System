/*  eslint-disable */
import { toast } from "react-toastify";

// Regular Expressions
const EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const OnlyNumberRegx = /^\d+$/;
const validFileExtensions = ["jpg", "jpeg", "png"];
const MobileRegx = /^(?:\+62|62|0)[0-9]{8,12}$/;

class FormHelper {
  // Check if a value is empty or null
  static IsEmpty(value) {
    return typeof value !== "string" || value.trim().length === 0;
  }

  // Validate Bangladeshi mobile number
  static IsMobile(value) {
    if (IsEmpty(value)) return false;
    return MobileRegx.test(value.trim());
  }

  // Validate image file extension
  static IsImageValid(fileName = "") {
    if (IsEmpty(fileName)) return false;
    const extension = fileName.split(".").pop().toLowerCase();
    return validFileExtensions.includes(extension);
  }

  // Validate if only numeric input
  static IsNumber(value) {
    if (IsEmpty(value)) return false;
    return OnlyNumberRegx.test(value.trim());
  }

  // Validate email format
  static IsEmail(value) {
    if (IsEmpty(value)) return false;
    return !EmailRegx.test(value.trim());
  }

  // Toast for error
  static ErrorToast(msg) {
    if (!msg) return;

    toast.error(msg, { position: "bottom-center" });
  }

  // Toast for success
  static SuccessToast(msg) {
    if (!msg) return;
    toast.success(msg, { position: "bottom-center" });
  }

  // Convert file to base64
  static ToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // ********** NEW METHOD **********
  // Validate real image file + extension + MIME
  static IsValidImageFile(file) {
    if (!file) return false;

    const fileName = file.name || "";
    const extension = fileName.split(".").pop().toLowerCase();

    // Check extension
    if (!validFileExtensions.includes(extension)) {
      return false;
    }

    // Check MIME type (real file type)
    if (!file.type.startsWith("image/")) {
      return false;
    }

    return true;
  }
}

export const {
  IsEmpty,
  IsMobile,
  IsEmail,
  IsNumber,
  IsImageValid,
  ToBase64,
  ErrorToast,
  SuccessToast,
  IsValidImageFile,
} = FormHelper;
