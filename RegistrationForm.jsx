import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  countryCode: "+91",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: "",
};

const countryOptions = ["India", "USA", "UK", "Canada", "Australia"];

function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const validate = (vals) => {
    const newErrors = {};

    if (!vals.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!vals.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!vals.username.trim()) newErrors.username = "Username is required.";

    if (!vals.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email.trim())
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!vals.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (vals.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!vals.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{7,15}$/.test(vals.phone.trim())) {
      newErrors.phone = "Phone must be 7–15 digits.";
    }

    if (!vals.country.trim()) newErrors.country = "Country is required.";
    if (!vals.city.trim()) newErrors.city = "City is required.";

    if (!vals.pan.trim()) {
      newErrors.pan = "PAN is required.";
    } else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(vals.pan.trim().toUpperCase())) {
      newErrors.pan = "Enter a valid PAN (e.g., ABCDE1234F).";
    }

    if (!vals.aadhaar.trim()) {
      newErrors.aadhaar = "Aadhaar is required.";
    } else if (!/^\d{12}$/.test(vals.aadhaar.trim())) {
      newErrors.aadhaar = "Aadhaar must be 12 digits.";
    }

    return newErrors;
  };

  useEffect(() => {
    const v = validate(values);
    setErrors(v);
    setIsValid(Object.keys(v).length === 0);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    setTouched(
      Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );
    if (Object.keys(v).length === 0) {
      navigate("/summary", { state: values });
    }
  };

  const fieldClass = (field) =>
    `input-field ${touched[field] && errors[field] ? "input-error" : ""}`;

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h1>Sign Up</h1>
          <p>Create your profile in a minute.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="field-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              className={fieldClass("firstName")}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John"
            />
            {touched.firstName && errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </div>

          <div className="field-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              className={fieldClass("lastName")}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Doe"
            />
            {touched.lastName && errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </div>

          {/* Username */}
          <div className="field-group full-width">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              className={fieldClass("username")}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="johndoe_01"
            />
            {touched.username && errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="field-group full-width">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              className={fieldClass("email")}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
            />
            {touched.email && errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Password with show/hide */}
          <div className="field-group full-width">
            <label>Password *</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={fieldClass("password")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Phone: Country Code + Phone */}
          <div className="field-group">
            <label>Country Code *</label>
            <select
              name="countryCode"
              className="input-field"
              value={values.countryCode}
              onChange={handleChange}
            >
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+81">+81 (JP)</option>
            </select>
          </div>

          <div className="field-group">
            <label>Phone No *</label>
            <input
              type="tel"
              name="phone"
              className={fieldClass("phone")}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
            />
            {touched.phone && errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          {/* Country & City */}
          <div className="field-group">
            <label>Country *</label>
            <select
              name="country"
              className={fieldClass("country")}
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select country</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {touched.country && errors.country && (
              <span className="error-text">{errors.country}</span>
            )}
          </div>

          <div className="field-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              className={fieldClass("city")}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Hyderabad"
            />
            {touched.city && errors.city && (
              <span className="error-text">{errors.city}</span>
            )}
          </div>

          {/* PAN */}
          <div className="field-group">
            <label>PAN *</label>
            <input
              type="text"
              name="pan"
              className={fieldClass("pan")}
              value={values.pan}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  pan: e.target.value.toUpperCase(),
                }))
              }
              onBlur={handleBlur}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
            {touched.pan && errors.pan && (
              <span className="error-text">{errors.pan}</span>
            )}
          </div>

          {/* Aadhaar */}
          <div className="field-group">
            <label>Aadhaar *</label>
            <input
              type="text"
              name="aadhaar"
              className={fieldClass("aadhaar")}
              value={values.aadhaar}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="12-digit number"
              maxLength={12}
            />
            {touched.aadhaar && errors.aadhaar && (
              <span className="error-text">{errors.aadhaar}</span>
            )}
          </div>

          {/* Submit */}
          <div className="actions full-width">
            <button
              type="submit"
              className="primary-btn"
              disabled={!isValid}
            >
              {isValid ? "Create Account" : "Complete all fields"}
            </button>
            <p className="hint-text">
              Your data stays local. This is a demo form for learning React.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
