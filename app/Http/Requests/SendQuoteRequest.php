<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SendQuoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255', 'phone:ZA'],
            'message' => ['required', 'string', 'max:5000'],
            'website_url' => ['prohibited'],
            'windows' => ['nullable', 'array'], // 'nullable' allows it to be empty if no rows are added, or all are removed
        ];

        // Apply conditional validation for each window row
        // Using $this->input('windows', []) to safely get the array, even if not present
        foreach ($this->input('windows', []) as $index => $window) {

            $hasAnyField = ! empty($window['type']) || ! empty($window['height']) || ! empty($window['drop']) || ! empty($window['quantity']);

            // If any field in the current window row is filled, then all fields in that row are required.
            if ($hasAnyField) {
                $rules["windows.{$index}.type"] = ['required', 'string', Rule::in(['burglar-bars', 'trellis'])];
                $rules["windows.{$index}.height"] = ['required', 'numeric', 'min:1'];
                $rules["windows.$index.drop"] = ['required', 'numeric', 'min:1'];
                $rules["windows.$index.quantity"] = ['required', 'numeric', 'min:1'];
            } else {
                // If all fields are empty, make them optional by providing empty rule array or 'nullable'
                $rules["windows.{$index}.type"] = ['nullable', 'string', Rule::in(['burglar-bars', 'trellis'])];
                $rules["windows.{$index}.height"] = ['nullable', 'numeric'];
                $rules["windows.{$index}.drop"] = ['nullable', 'numeric'];
                $rules["windows.{$index}.quantity"] = ['nullable', 'numeric'];
            }
        }

        return $rules;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        $messages = [];
        foreach ($this->input('windows', []) as $index => $window) {
            $itemNumber = $index + 1;
            $messages["windows.{$index}.type.required"] = "The type for item #{$itemNumber} is required.";
            $messages["windows.{$index}.type.in"] = "The type for item #{$itemNumber} must be either 'Burglar Bars' or 'Trellis'.";
            $messages["windows.{$index}.height.required"] = "The height for item #{$itemNumber} is required.";
            $messages["windows.{$index}.height.numeric"] = "The height for item #{$itemNumber} must be a number.";
            $messages["windows.{$index}.height.min"] = "The height for item #{$itemNumber} must be at least 1.";
            $messages["windows.{$index}.drop.required"] = "The drop for item #{$itemNumber} is required.";
            $messages["windows.{$index}.drop.numeric"] = "The drop for item #{$itemNumber} must be a number.";
            $messages["windows.{$index}.drop.min"] = "The drop for item #{$itemNumber} must be at least 1.";
            $messages["windows.{$index}.quantity.required"] = "The quantity for item #{$itemNumber} is required.";
            $messages["windows.{$index}.quantity.numeric"] = "The quantity for item #{$itemNumber} must be a number.";
            $messages["windows.{$index}.quantity.min"] = "The quantity for item #{$itemNumber} must be at least 1.";
        }

        return $messages;
    }
}
