<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DislikePersonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'people_id' => [
                'required',
                'integer',
                'exists:people,id',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'people_id.required' => 'The people ID is required.',
            'people_id.exists' => 'The selected person does not exist.',
        ];
    }
}
