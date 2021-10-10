<?php

namespace App\Http\Controllers;

use App\Http\Requests\Authentication\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    /**
     * Login
     */
    public function login(LoginRequest $request)
    {
        $validatedData = $request->validated();

        $user = User::where('username', $validatedData['username'])->first();

        if ($user) {
            if (Hash::check($validatedData['password'], $user->password)) {
                $token = $user->createToken('AccessToken');
                return response()->json(['token' => $token->plainTextToken, 'role' => $user->role]);
            }
        }

        return response()->json('Invalid Credentials', 401);
    }

    /**
     * Logout
     */
    public function logout()
    {
        if (Auth::check()) {
            $authenticatedUser = Auth::user();
            $authenticatedUser->tokens()->delete();

            return response()->json('User logged out', 200);
        }

        return response()->json(null, 204);
    }
}
