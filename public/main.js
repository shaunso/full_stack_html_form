// Radio button selection
document.addEventListener('DOMContentLoaded', () => {
  const raceSel = document.querySelectorAll("#event-category ul");

  raceSel.forEach( selEv => {
    selEv.addEventListener('click', (e) => {
      // clicks the closest target input
      const groupItem = e.target.closest('input');
      if (!groupItem) return;

      // clicked event list item
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