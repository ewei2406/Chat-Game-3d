const infoDiv = document.getElementById('info') as HTMLElement

const info = (i: Array<string>) => {
    infoDiv.innerHTML = ""

    i.map((element: string) => {
        const newBlock: HTMLElement = document.createElement('div')
        newBlock.innerText = element
        infoDiv.appendChild(newBlock)
    })
}

export default info