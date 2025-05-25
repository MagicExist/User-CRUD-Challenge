<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response;

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
