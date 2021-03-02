document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('.sidebar-header-toggle')
  let toggleIcon = document.querySelector('.sidebar-header-toggle-icon')
  let colerList = document.querySelector(".coler-list")
  let based = document.querySelector('#based')
  let compared = document.querySelector('#compared')
  let colerSearch = document.querySelector('#coler-search')
  let toggleImage = document.querySelector('.toggle-image')
  let facade = document.querySelector('#facade')
  let interior = document.querySelector('#interior')
  let imageTemplate = document.querySelector('.image-template')
  let colerSelected = document.querySelector('.coler-selected')
  let colerSelectButton = document.querySelector('.coler-select-button')
  let coleringOption = 'interior'

  colerSelectButton.addEventListener('click', () => {
    console.log(window.location)
    if (window.location.href.includes('product')) {
		  document.querySelector('#colerProductId').value = colerSelected.dataset[`${coleringOption}_id`]
		  document.querySelector('#colerPick').style.backgroundColor = colerSelected.style.backgroundColor
      jQuery.magnificPopup.close()
    }
  })

  toggleImage.addEventListener('click', () => {
    coleringOption = coleringOption === 'interior' ? 'facade' : 'interior'
    if (coleringOption === 'interior') {
      facade.classList.add('d-none')
      interior.classList.remove('d-none')
      imageTemplate.classList.remove('image-template-url')
    } else {
      facade.classList.remove('d-none')
      interior.classList.add('d-none')
      imageTemplate.classList.add('image-template-url')
    }
  })

  based.addEventListener('click', () => {
    let selected = document.querySelector(`.coler-element.based`)
    if (selected) {
      colerSelected.style.backgroundColor = selected.style.backgroundColor;
      colerSelected.textContent = selected.title;
    }
    based.classList.add('changed')
    compared.classList.remove('changed')
  })

  compared.addEventListener('click', () => {
    let selected = document.querySelector(`.coler-element.compared`)
    if (selected) {
      colerSelected.style.backgroundColor = selected.style.backgroundColor;
      colerSelected.textContent = selected.title;
    }
    compared.classList.add('changed')
    based.classList.remove('changed')
  })

  colerSearch.addEventListener('input', function() {
    window.colers.forEach(coler => {
      let colerElement = document.getElementById(`coler-element-${coler.id}`)
      if (coler.id.includes(this.value.toLowerCase()) || coler.tone.includes(this.value.toLowerCase())) {
        colerElement.style.display = 'block'
      } else {
        colerElement.style.display = 'none'
      }
    })
  });

  generateColers(window.colers)

  function generateColers(colers) {
    while (colerList.firstChild) {
      colerList.removeChild(colerList.firstChild);
    }

    colers.forEach(coler => {
      // colergroup
      let groupIdent = null
      let colergroup = document.querySelector(`#coler-group-${coler.group}`)
      if (colergroup === null) {
        colergroup = document.createElement('div')
        colergroup.id = `coler-group-${coler.group}`
        colergroup.classList.add('coler-group')
        colerList.appendChild(colergroup)

        // groupIdent
        groupIdent = document.createElement('div')
        groupIdent.classList.add('group-ident')
        groupIdent.innerText = coler.group
      }
      // colerElement
      let colerElement = document.createElement('div')
      colerElement.id = `coler-element-${coler.id}`
      colerElement.classList.add('coler-element')
      colerElement.style.background = coler.color
      colerElement.setAttribute('title', coler.id)
      colerElement.addEventListener('click', function () {
        selectColer(this, coler)
      })
      colergroup.appendChild(colerElement)

      // groupIdent
      if (groupIdent !== null) colerElement.appendChild(groupIdent)

      // colerIdent
      let colerIdent = document.createElement('div')
      colerIdent.classList.add('coler-ident')
      colerIdent.innerText = coler.id
      colerElement.appendChild(colerIdent)

      // colerTick
      // let colerTick = document.createElement('img')
      // colerTick.classList.add('coler-tick')
      // colerTick.src = './img/tick.svg'
      // colerElement.appendChild(colerTick)

      // based
      let based = document.createElement('img')
      based.classList.add('based-img')
      based.src = '/wp-content/uploads/2021/01/based.svg'
      colerElement.appendChild(based)

      // compared
      let compared = document.createElement('img')
      compared.classList.add('compared-img')
      compared.src = '/wp-content/uploads/2021/01/compared.svg'
      colerElement.appendChild(compared)
    })
  }

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-hide')
    content.classList.toggle('content-full')
    toggleIcon.classList.toggle('mirror-x')
  })

  function selectColer(element, coler) {
    let changedId = document.querySelector('.color-side.changed').id
    let selected = document.querySelector(`.coler-element.${changedId}`)
    changeColor(coler.id, coler.color, changedId)
    console.log(coler.color)
    colerSelected.style.backgroundColor = coler.color;
    colerSelected.textContent = coler.id;
    colerSelected.dataset.interior_id = coler.interior_id;
    colerSelected.dataset.facade_id = coler.facade_id;
    colerSelectButton.textContent = 'Цвет выбран'
    colerSelectButton.classList.remove('disabled')

    if (element.classList.contains(changedId)) {
      element.classList.remove(changedId)
    } else {
      element.classList.add(changedId)
      selected && selected.classList.remove(changedId)
    }
  }

  // function addElementToLocalStorage(coler) {
  //   let colers = JSON.parse(localStorage.getItem('colers'))
  //   if (colers) {
  //     colers.push(coler)
  //     localStorage.setItem('colers', JSON.stringify(colers))
  //     return colers
  //   }
  //   localStorage.setItem('colers', JSON.stringify([coler]))
  //   return [coler]
  // }

  // function removeElementFromLocalStorage(coler) {
  //   let colers = JSON.parse(localStorage.getItem('colers'))
  //   if (colers) {
  //     colers.shift(coler)
  //     localStorage.setItem('colers', JSON.stringify(colers))
  //     return colers
  //   }
  //   return []
  // }

  function changeColor(colerId, color, element) {
    let backgroundElement = document.querySelector(`#background-${element}`)
    let colerIdElement = document.querySelector(`#coler-${element}-id`)
    backgroundElement.style.backgroundColor = color
    colerIdElement.textContent = colerId
  }
})

