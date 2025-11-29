/*  eslint-disable */
import { toast } from "react-toastify";

// Regular Expressions
const EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const OnlyNumberRegx = /^\d+$/;
const validFileExtensions = ["jpg", "jpeg", "png"];
const MobileRegx = /^(?:\+88|0088)?01[3-9]\d{8}$/; // Bangladesh mobile format

class FormHelper {
  // Check if a value is empty or null
  static isEmpty(value) {
    return typeof value !== "string" || value.trim().length === 0;
  }

  // Validate Bangladeshi mobile number
  static isMobile(value) {
    if (this.isEmpty(value)) return false;
    return MobileRegx.test(value.trim());
  }

  // Validate image file extension
  static isImageValid(fileName = "") {
    if (this.isEmpty(fileName)) return false;
    const extension = fileName.split(".").pop().toLowerCase();
    return validFileExtensions.includes(extension);
  }

  // Validate if only numeric input
  static isNumber(value) {
    if (this.isEmpty(value)) return false;
    return OnlyNumberRegx.test(value.trim());
  }

  // Validate email format
  static isEmail(value) {
    if (this.isEmpty(value)) return false;
    return EmailRegx.test(value.trim());
  }

  // Toast for error
  static errorToast(msg) {
    if (!msg) return;

    toast.error(msg, { position: "bottom-center" });
  }

  // Toast for success
  static successToast(msg) {
    if (!msg) return;
    toast.success(msg, { position: "bottom-center" });
  }

  // Convert file to base64
  static toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // ********** NEW METHOD **********
  // Validate real image file + extension + MIME
  static isValidImageFile(file) {
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

export default FormHelper;
