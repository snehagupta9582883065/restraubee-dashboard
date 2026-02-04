import React from 'react'

const footer = () => {
    return (
        <footer className="bg-[#f5f5f7] py-20 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div>
                        <div className="font-bold text-2xl text-[#1d1d1f] mb-6">RestauBEE</div>
                        <p className="text-[#86868b] text-sm max-w-xs leading-relaxed">
                            Make in India ❤️.
                        </p>
                    </div>

                    <div className="flex gap-20">
                        <div>
                            <h4 className="font-semibold text-[#1d1d1f] text-sm mb-4">Product</h4>
                            <ul className="space-y-3 text-sm text-[#424245]">
                                <li><a href="#" className="hover:underline">Features</a></li>
                                <li><a href="#" className="hover:underline">Pricing</a></li>
                                <li><a href="#" className="hover:underline">Download</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#1d1d1f] text-sm mb-4">Support</h4>
                            <ul className="space-y-3 text-sm text-[#424245]">
                                <li><a href="#" className="hover:underline">Help Center</a></li>
                                <li><a href="#" className="hover:underline">Contact Us</a></li>
                                <li><a href="#" className="hover:underline">Status</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer