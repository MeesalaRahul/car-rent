const app = angular.module("carRentalApp", []);

app.controller("MainController", function ($scope, $http, $window) {
    $scope.user = {};
    $scope.cars = [
        { id: 1, name: "Toyota Corolla", type: "Sedan", speed: "180", seats: 5, milage: "30 MPG", price_per_day: 40, image_url: "assets/car1.jpg" },
        { id: 2, name: "Honda Civic", type: "Sedan", speed: "190", seats: 5, milage: "32 MPG", price_per_day: 45, image_url: "assets/car2.jpg" },
        { id: 3, name: "Tesla Model 3", type: "Electric", speed: "225", seats: 5, milage: "300 miles", price_per_day: 70, image_url: "assets/car3.jpg" }
    ];
    $scope.search = {};
    $scope.searchResults = [];
    $scope.booking = {};
    $scope.selectedCar = null;
    $scope.showPayment = false;
    $scope.otpSent = false;

    $scope.login = function () {
        // Simulate login
        const mockUser = { email: "test@example.com", password: "password123" };
        if ($scope.user.email === mockUser.email && $scope.user.password === mockUser.password) {
            $window.localStorage.setItem("token", "mock-token");
            $window.location.href = "home.html";
        } else {
            alert("Login failed");
        }
    };

    $scope.register = function () {
        // Simulate OTP sending
        $scope.otpSent = true;
    };

    $scope.verifyOtp = function () {
        // Simulate OTP verification
        if ($scope.user.otp === "1234") {
            alert("Registration successful, please login");
            $window.location.href = "login.html";
        } else {
            alert("Invalid OTP");
        }
    };

    $scope.searchCars = function () {
        $scope.searchResults = $scope.cars; // Simulate search
        $window.location.href = "search.html";
    };

    $scope.calculatePrice = function (pricePerDay) {
        const start = new Date($scope.search.start);
        const end = new Date($scope.search.stop);
        const days = (end - start) / (1000 * 60 * 60 * 24);
        return Math.round(pricePerDay * days);
    };

    $scope.calculateTotalPrice = function (pricePerDay) {
        const basePrice = $scope.calculatePrice(pricePerDay);
        const fuelCost = $scope.booking.with_fuel === "true" ? 50 : 0;
        const tax = basePrice * 0.1;
        return Math.round(basePrice + fuelCost + tax);
    };

    $scope.bookCar = function (carId) {
        const token = $window.localStorage.getItem("token");
        if (!token) {
            $window.location.href = "login.html";
            return;
        }
        $scope.selectedCar = $scope.cars.find(car => car.id === carId);
        $window.location.href = "booking.html";
    };

    $scope.confirmBooking = function () {
        $scope.showPayment = true;
    };

    $scope.pay = function (method) {
        const totalPrice = $scope.booking.with_fuel === "true" ? $scope.calculateTotalPrice($scope.selectedCar.price_per_day) : $scope.calculatePrice($scope.selectedCar.price_per_day) * 1.1;
        const bookingData = {
            user_id: 1, // Mock user ID
            car_id: $scope.selectedCar.id,
            location: $scope.search.location,
            start_date: $scope.search.start,
            end_date: $scope.search.stop,
            with_fuel: $scope.booking.with_fuel === "true",
            total_price: totalPrice
        };
        console.log("Booking Data:", bookingData); // Simulate saving to database
        alert("Booking successful with " + method);
        $window.location.href = "home.html";
    };
});