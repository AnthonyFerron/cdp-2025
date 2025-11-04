

export default function getAdminUrl() {
    return new URL('/backend/api/admin/', process.env.NEXT_PUBLIC_BASE_URL)
}