<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'string', 'max:255','unique:users'],
            'password' => ['required', 'string', 'min:8', ],
        ];

        if ($this->getMethod() == 'PATCH') {
            $rules['email'] = ['required', Rule::unique('users')->ignore($this->route('user_id'))];
        }

        return $rules;
    }
}