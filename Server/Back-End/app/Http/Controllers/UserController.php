<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->validate([
            'name'=>'required|string|max:100',
            'surname'=>'required|string|max:100',
            'age'=>'required|integer',
            'email'=>'required|string|max:255',
            'password'=>'required|string|min:8|confirmed'
        ]);

        try {
            
            User::create([
                'name' => $user['name'],
                'surname' => $user['surname'],
                'age' => $user['age'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
            ]);

            return response()->json([
            'message' => 'Usuario creado correctamente.',
            'data' => $user,
            ], Response::HTTP_CREATED); // 201
        } 
        catch (QueryException $e) {
            return response()->json([
            'message' => 'Error al crear el usuario.',
            'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado.'
            ], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Validar solo los campos que vengan en la solicitud (algunos pueden faltar)
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'surname' => 'sometimes|required|string|max:100',
            'age' => 'sometimes|required|integer',
            'email' => [
                'sometimes', 'required', 'string', 'email', 'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);

        // Si se incluye 'password', la encriptamos
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        // Actualizar solo los campos enviados
        $user->update($validated);

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado.'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.'
        ], 200);
    }
}
