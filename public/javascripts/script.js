$(function () {
  loadCars();
  loadSpareparts();
  loadServices();
  $(".body").on("click", ".btn-danger", handleDelete);
  $("#addCarSave").click(addCar);
});

function loadCars() {
  $.ajax({
    url: "/api/cars",
    method: "GET",
    error: function (response) {
      var cars = $("#cars");
      cars.html("An error occoured");
    },
    success: function (response) {
      var cars = $("#cars");
      cars.empty();
      for (var i = 0; i < response.length; i++) {
        cars.append(`<tr class="text-center" id="del-tr" data="cars" data-id="${
          response[i]._id
        }">
                        <td>${i + 1}</td>
                        <td>${response[i].name}</td>
                        <td>${response[i].model}</td>
                        <td>${response[i].used}</td>
                        <td>${response[i].price}</td>
                        <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                        <td class="col-1"> <button class="btn btn-info float-right"> Edit </button> </td>
                    </tr>`);
      }
    },
  });
}

function addCar() {
  var name = $("#addName").val();
  var model = $("#addModel").val();
  var used = true;
  var price = $("#addPrice").val();
  $.ajax({
    url: "/api/cars",
    data: { name, model, used, price },
    method: "POST",
    error: function (response) {
      var cars = $("#cars");
      cars.html("An error occoured in add new product");
    },
    success: function () {
      window.location.replace("/buy");
    },
  });
}

function loadSpareparts() {
  $.ajax({
    url: "/api/spareparts",
    method: "GET",
    error: function (response) {
      var spareparts = $(".spareparts");
      spareparts.html("An error occoured");
    },
    success: function (response) {
      var spareparts = $(".spareparts");
      spareparts.empty();
      for (var i = 0; i < response.length; i++) {
        spareparts.append(`<tr class="text-center" data="spareparts" data-id="${
          response[i]._id
        }">
                          <td>${i + 1}</td>
                          <td>${response[i].name}</td>
                          <td>${response[i].company}</td>
                          <td>${response[i].model}</td>
                          <td>${response[i].price}</td>
                          <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                          <td class="col-1"> <button class="btn btn-info float-right"> Edit </button> </td>
                      </tr>`);
      }
    },
  });
}

function loadServices() {
  $.ajax({
    url: "/api/services",
    method: "GET",
    error: function (response) {
      var services = $(".services");
      services.html("An error occoured");
    },
    success: function (response) {
      var services = $(".services");
      services.empty();
      for (var i = 0; i < response.length; i++) {
        services.append(`<tr class="text-center" data="services" data-id="${
          response[i]._id
        }">
                          <td>${i + 1}</td>
                          <td>${response[i].name}</td>
                          <td>${response[i].price}</td>
                          <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                          <td class="col-1"> <button class="btn btn-info float-right"> Edit </button> </td>
                      </tr>`);
      }
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let data = parentTr.attr("data");
  let id = parentTr.attr("data-id");
  $.ajax({
    url: "/api/" + data + "/" + id,
    method: "DELETE",
    error: function (response) {
      var products = $("#products");
      products.html("An error occoured in delete");
    },
    success: function () {
      location.reload(true);
    },
  });
}
