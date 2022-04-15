import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationProps {
  initialValues: { [key: string]: string };
  validationRules: { [key: string]: ValidationRules };
  onSubmit: (values: { [key: string]: string }) => void;
}

const useFormValidation = ({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormValidationProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: string, value: string) => {
      const rules = validationRules[name];
      if (!rules) return '';

      if (rules.required && !value) {
        return 'This field is required';
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `Minimum length is ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Maximum length is ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Invalid format';
      }

      if (rules.custom && !rules.custom(value)) {
        return 'Invalid value';
      }

      return '';
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const newErrors: ValidationErrors = {};
      Object.keys(validationRules).forEach((name) => {
        const error = validateField(name, values[name]);
        if (error) {
          newErrors[name] = error;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        await onSubmit(values);
      }

      setIsSubmitting(false);
    },
    [values, validationRules, validateField, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation; 