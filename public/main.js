// Radio button selection
document.addEventListener('DOMContentLoaded', () => {
  const raceSel = document.querySelectorAll("#event-category ul");

  raceSel.forEach( selEv => {
    selEv.addEventListener('click', (e) => {
      const groupItem = e.target.closest('input');
      if (!groupItem) return;

      const item = groupItem.parentElement;

      const otherItems = document.querySelectorAll('li.radio-btn');
      otherItems.forEach( othItm => {
          if ( othItm !== item ) {
            othItm.classList.remove('selected')
          }  else { 
            item.classList.add('selected');
          }
      })
    })
  })
})