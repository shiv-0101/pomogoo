'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/profile';

export default function MyProfile() {
    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-time?id=${post._id}`);
    }

    const handleDelete = async (post) => {

    }

    return (
        <Profile
            name="My"
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}