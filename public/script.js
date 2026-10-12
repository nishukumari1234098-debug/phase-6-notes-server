 let notesFrom = document.getElementById("notesForm")
        let titleName = document.getElementById("titleName")
        let contentMsg = document.getElementById("contentMsg")
        let resultContainer = document.getElementById("resultContainer")
        let message = document.getElementById("message")

        notesFrom.addEventListener("submit", async (event)=>{
            event.preventDefault()

            let title = titleName.value
            let content = contentMsg.value

            const serverNotes = {
                title,
                content
            }

            const response = await fetch("/notes", {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(serverNotes)
            })
            const data = await response.json()

            if(data.success){
                message.textContent = "Data Successfully submitted!"
                getData()
            }
            else{
                message.textContent = data.message
            }

            titleName.value = ""
            contentMsg.value = ""
        })

        async function getData(){
            const response = await fetch("/notes")
            const data = await response.json()

            resultContainer.innerHTML = ""

            data.data.forEach(element => {
                const div = document.createElement("div")

                div.innerHTML = `
                <p>Title: ${element.title}</p>
                <p>Content: ${element.content}</p>
                `
                resultContainer.appendChild(div)
            });
        }