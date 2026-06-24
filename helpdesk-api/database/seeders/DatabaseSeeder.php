<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 認証なしのアプリのためユーザーは作らず、問い合わせのサンプルのみ投入する
        $this->call(InquirySeeder::class);
    }
}
