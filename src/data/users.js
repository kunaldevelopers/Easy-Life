export const users = [
  {
    id: 'user1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543201',
    type: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'MG Marg',
    joinDate: '2023-06-15',
    verified: true
  },
  {
    id: 'user2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543202',
    type: 'customer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Tadong',
    joinDate: '2023-08-22',
    verified: true
  },
  {
    id: 'seller1',
    name: 'Gangtok Electronics Owner',
    email: 'electronics@example.com',
    phone: '+91 9876543210',
    type: 'seller',
    businessId: 1,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'MG Marg',
    joinDate: '2023-03-10',
    verified: true,
    kycStatus: 'approved'
  },
  {
    id: 'seller2',
    name: 'Himalayan Plumbing Owner',
    email: 'plumbing@example.com',
    phone: '+91 9876543211',
    type: 'seller',
    businessId: 2,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Tadong',
    joinDate: '2023-04-18',
    verified: true,
    kycStatus: 'approved'
  },
  {
    id: 'admin1',
    name: 'Easy Life Admin',
    email: 'admin@easylife.com',
    phone: '+91 9876543200',
    type: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Gangtok',
    joinDate: '2023-01-01',
    verified: true,
    permissions: ['manage_users', 'manage_listings', 'view_analytics', 'handle_disputes']
  }
];

export const bookings = [
  {
    id: 'booking1',
    userId: 'user1',
    businessId: 1,
    serviceType: 'Mobile repair',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'confirmed',
    price: 500,
    description: 'Screen replacement for iPhone',
    createdAt: '2024-01-18',
    paymentStatus: 'paid'
  },
  {
    id: 'booking2',
    userId: 'user2',
    businessId: 2,
    serviceType: 'Pipe leakage fix',
    date: '2024-01-19',
    time: '2:00 PM',
    status: 'pending',
    price: 800,
    description: 'Kitchen sink pipe repair',
    createdAt: '2024-01-17',
    paymentStatus: 'pending'
  },
  {
    id: 'booking3',
    userId: 'user1',
    businessId: 3,
    serviceType: 'Table reservation',
    date: '2024-01-22',
    time: '7:00 PM',
    status: 'confirmed',
    price: 1200,
    description: 'Dinner for 4 people',
    createdAt: '2024-01-19',
    paymentStatus: 'paid'
  },
  {
    id: 'booking4',
    userId: 'user2',
    businessId: 4,
    serviceType: 'Room booking',
    date: '2024-01-25',
    time: '2:00 PM',
    status: 'confirmed',
    price: 3500,
    description: 'Deluxe room for 2 nights',
    createdAt: '2024-01-16',
    paymentStatus: 'paid'
  },
  {
    id: 'booking5',
    userId: 'user1',
    businessId: 5,
    serviceType: 'Home wiring',
    date: '2024-01-21',
    time: '11:00 AM',
    status: 'completed',
    price: 2000,
    description: 'LED light installation in 3 rooms',
    createdAt: '2024-01-15',
    paymentStatus: 'paid'
  }
];