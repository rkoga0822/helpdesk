<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class InquiryController extends Controller
{
    // 一覧取得（status で絞り込み）
    public function index(Request $request)
    {
        $query = Inquiry::query();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    // 新規登録
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
            'requester' => 'required|string|max:100',
        ]);

        $validated['status'] = 'pending';
        $inquiry = Inquiry::create($validated);

        return response()->json($inquiry, 201);
    }

    // ステータス更新
    public function update(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed',
            'title' => 'sometimes | string | max:100',
            'content' => 'sometimes | string | max:1000'
        ]);

        $inquiry->update($validated);

        return response()->json($inquiry);
    }

    // 削除
    public function destroy(Inquiry $inquiry)
    {
        Gate::authorize('admin');  // 管理者でなければ 403 を返す

        $inquiry->delete();

        return response()->json(null, 204);
    }
}
