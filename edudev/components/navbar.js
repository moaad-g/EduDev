export default function Navbar() {
    return(
        <div class="bg-gray-900 border-b border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div class="px-3">
                        <a href="/login" class="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1 block font-medium">Login</a>
                    </div>
                    <a href="/login" class="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1 block font-medium">Sign Up</a>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" class="block py-2 px-3 text-white  hover:text-blue-500 rounded md:p-0">EduDev</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white rounded hover:text-blue-500 md:p-0">About</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}