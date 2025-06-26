<?php

namespace App\Http\Controllers\Api;

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
// use App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{

    public function updateProfileImage(Request $request)
    {
        $user = auth()->user(); // Jangan lupa gunakan lowercase "auth()"

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/profil', $filename);

            if ($user->img_url && Storage::exists('public/profil/' . $user->img_url)) {
                Storage::delete('public/profil/' . $user->img_url);
            }

            $user->img_url = $filename;
            $user->save();

            return response()->json([
                'message' => 'Profile image updated',
                'img_url' => $filename,
            ]);
        }

        return response()->json(['message' => 'No image uploaded'], 400);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->name = $request->name;
        $user->save();

        return response()->json([
            'message' => 'Username updated successfully.',
            'data' => $user
        ]);
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'img_url' => $this->img_url, // tambahkan ini
        ];
    }
}
