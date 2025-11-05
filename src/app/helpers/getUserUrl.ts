

export default function getUserUrl() {
    return new URL('/backend/api/user/', process.env.NEXT_PUBLIC_BASE_URL)
}