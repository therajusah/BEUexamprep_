import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "file";
}

const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
}: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-gray-300">{label}</FormLabel>
                <FormControl>
                    <Input
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-lg h-11 px-4 focus:border-blue-400 focus:ring-blue-400 focus:ring-1 transition-colors"
                        placeholder={placeholder}
                        type={type}
                        {...field}
                    />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
            </FormItem>
        )}
    />
);

export default FormField;
