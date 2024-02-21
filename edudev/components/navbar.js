export default function Navbar() {
    return(
        <div class="bg-gray-800 border-b border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div class="px-3">
                        <a href="/login" class="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1 block font-medium">Login</a>
                    </div>
                    <a href="/sign-up" class="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1 block font-medium">Sign Up</a>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-transparent">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        <li>
                            <a href="/" class="py-2 px-3 text-white hover:text-blue-500 md:p-0 bg-transparent">EduDev</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 text-white hover:text-blue-500 md:p-0 bg-transparent">About</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}