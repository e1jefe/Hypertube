<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
//        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
//        $socialite->extend(
//            'intra',
//            function ($app) use ($socialite) {
//                $config = $app['config']['services.intra'];
//                return $socialite->buildProvider(IntraProvider::class, $config);
//            }
//        );
        \Schema::defaultStringLength(150);
        $this->bootIntraSocialite();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
    private function bootIntraSocialite()
    {
        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
        $socialite->extend(
            'intra',
            function ($app) use ($socialite) {
                $config = $app['config']['services.intra'];
                return $socialite->buildProvider(IntraProvider::class, $config);
            }
        );
    }
}
