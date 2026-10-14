// File: src/showroom/presentation/showroom-routes.js
/**
 * @summary Child route declarations for the Showroom bounded context.
 * @author John Doe
 */
const newVehicleInventoryItem = () => import('./views/new-vehicle-inventory-item.vue');

const showroomRoutes = [
    {
        path: 'items/new',
        name: 'new-vehicle-inventory-item',
        component: newVehicleInventoryItem,
        meta: { title: 'New Vehicle Inventory Item' }
    }
];

export default showroomRoutes;