module.exports =(datas)=> {
    return datas.map((data) => {
        return`
        <div class="rounded-lg bg-slate-50 py-4 flex items-center justiy-center justify-self-center flex-row mb-1  mt-3 ml-3 mr-3">
            <div class="w-auto mb-0 flex-shrink-0 flex mx-1">
                <img style="height: 100px;" class="h-auto rounded-full"
                    src="https://m.media-amazon.com/images/I/615ndtx2raL._SY679_.jpg" />
            </div>
            <div class="flex flex-grow items-center mx-1">
                <div class="text-1xl font-medium text-gray-900 mb-2"> ${data.Name}</div>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-indigo-500 mb-3 mr-5">
                    ${data.Cost}Rs
                </p>
                <div class="mr-6 flex flex-column">
                    <div class="h-10 cursor-pointer flex items-center text-white text-xl hover:bg-indigo-700 bg-indigo-500 p-5" id="decrease" 
                        onclick="decreaseValue('${data.Name.replace( " ", "-" )}')" value="Decrease Value">-</div>
                    <input class="inputQuantity" type="number" name="${data.Name.replace(" ", "-")}" id="${data.Name.replace(" ", "-")}" value="0" />
                    <div class="h-10 cursor-pointer flex items-center text-white text-xl hover:bg-indigo-700 bg-indigo-500 p-5" id="increase" 
                        onclick="increaseValue('${data.Name.replace(" ", "-")}')" value="Increase Value">+</div>
                </div>
            </div>
        </div>`
    }).join("\n")
}