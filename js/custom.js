// load product to product container
$(document).ready(function () {
  const btnLoadMore = $("#loadMore");
  let offset = 0;
  let limit = 2;
  loadProduct(offset, limit);
  btnLoadMore.click(function () {
    offset += limit;
    loadProduct(offset, limit);
  });
  $(window).scroll(function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 200
    ) {
      // show load icon
      btnLoadMore.show();
      // delay 1s
      setTimeout(function () {
        offset += limit;
        loadProduct(offset, limit);
        // hide load icon
        btnLoadMore.hide();
      }, 1000);
    }
  });
});
const productContainer = $("#productContainer");
const productTemplate = (name, price, image) => `<div class="col">
<div class="card shadow-sm">
  <img
      src="${image}" alt="image" class="bd-placeholder-img card-img-top" 
      width="100%" height="225"
      />
   
  <div class="card-body">
    <p class="card-title">${name}</p>
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          Detail
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          Buy now
        </button>
      </div>
      <small class="text-muted">${price} vnd</small>
    </div>
  </div>
</div>
</div>`;

const loadProduct = (offset, limit) => {
  $.ajax({
    url: "./api/products.php",
    method: "GET",
    dataType: "json",
    data: {
      offset: offset,
      limit: limit,
    },
    success: function (data) {
      data.forEach((product) => {
        productContainer.append(
          productTemplate(product.name, product.price, product.image)
        );
      });
    },
  });
};
