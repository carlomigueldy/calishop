<?php

use App\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        
        $admin = Role::create(['name' => 'admin']);
        $seller = Role::create(['name' => 'seller']);
        $buyer = Role::create(['name' => 'buyer']);
        
        $this->createPermissions();

        // create admin user
        $user = User::create($this->users()[0]);
        $user->cart()->create();
        $user->assignRole($admin);

        // create seller user
        $user = User::create($this->users()[1]);
        $user->cart()->create();
        $user->assignRole($seller);

        // create buyer user
        $user = User::create($this->users()[2]);
        $user->cart()->create();
        $user->assignRole($buyer);
    }

    private function createPermissions()
    {
        foreach ($this->buyerPermissions() as $key => $value) {
            $permission = Permission::create(['name' => $value]);
            $role = Role::whereName('buyer')->first();
            $role->givePermissionTo($permission);
            $permission->assignRole($role);
        }

        foreach ($this->sellerPermissions() as $key => $value) {
            $permission = Permission::create(['name' => $value]);
            $role = Role::whereName('seller')->first();
            $role->givePermissionTo($permission);
            $permission->assignRole($role);
        }

        $role = Role::whereName('admin')->first();
        $role->givePermissionTo(Permission::all());
    }
    
    /**
     * All users.
     * 
     * @return Array
     */
    private function users()
    {
        return [
            [
                'name' => 'Carlo Miguel Dy',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Bruce Wayne',
                'email' => 'seller@seller.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Ana Faye Celesios',
                'email' => 'buyer@buyer.com',
                'password' => bcrypt('password')
            ],
        ];
    }

    /**
     * The buyer permissions.
     * 
     * @return Array
     */
    private function buyerPermissions()
    {
        return [
            'create cart items',
            'delete cart items',
            'update cart items',
            'read cart items',
        ];
    }

    /**
     * The seller permissions.
     * 
     * @return Array
     */
    private function sellerPermissions()
    {
        return [
            ''
        ];
    }
}
