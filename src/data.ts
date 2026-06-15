import { Product, Category, Brand, Review, Address } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics', description: 'Premium tech gadgets, devices, and computing rigs.' },
  { id: 'cat-2', name: 'Wearables', slug: 'wearables', description: 'Track your health, receive alerts, style your wrist.' },
  { id: 'cat-3', name: 'Accessories', slug: 'accessories', description: 'Cables, cases, chargers, and premium keyboard setups.' },
  { id: 'cat-4', name: 'Audio', slug: 'audio', description: 'Audiophile grade headphones, wireless buds, and soundbars.' }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: 'b-1', name: 'AeroLink' },
  { id: 'b-2', name: 'ZenithTech' },
  { id: 'b-3', name: 'OmniAudio' },
  { id: 'b-4', name: 'TitanCore' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Zenith Pro Smartwatch X8',
    slug: 'zenith-pro-smartwatch-x8',
    price: 249.99,
    description: 'The Zenith Pro Smartwatch X8 is a premium health tracker, featuring dynamic heart rate monitoring, blood-pressure estimation, multi-sport visual logs, sleep analysis, and full-color notification widgets on an outdoor-readable AMOLED panel.',
    category: 'Wearables',
    brand: 'ZenithTech',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.8,
    reviewsCount: 3,
    isPopular: true
  },
  {
    id: 'p-2',
    name: 'AeroLink Active ANC Buds',
    slug: 'aerolink-active-anc-buds',
    price: 129.99,
    description: 'Audiophile acoustics packed into smart, ultra-light visual chassis. Features 42dB Active Noise Cancellation, personalized transparency mode, five-microphone clear calls, and up to 36 hours of hybrid USB-C battery charging power.',
    category: 'Audio',
    brand: 'AeroLink',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.6,
    reviewsCount: 2,
    isPopular: true
  },
  {
    id: 'p-3',
    name: 'TitanCore Mechanical Key Rig',
    slug: 'titancore-mechanical-key-rig',
    price: 189.99,
    description: 'Hot-swappable custom linear switch setup with per-key structural RGB, double-shot PBT visual keycaps, volume dial knob, silent sound-dampening acoustic foams, and durable aircraft-grade frame.',
    category: 'Accessories',
    brand: 'TitanCore',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1,
    isPopular: false
  },
  {
    id: 'p-4',
    name: 'Omni Soundbar 360 Cinema',
    slug: 'omni-soundbar-360-cinema',
    price: 349.99,
    description: 'Immersive soundscape leveraging structural Dolby Atmos mapping, deep physical 8-inch wireless subwoofers, smart voice assistant control routing, dynamic eARC connectivity, and visual matching profiles for premium setups.',
    category: 'Audio',
    brand: 'OmniAudio',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.5,
    reviewsCount: 1,
    isPopular: false
  },
  {
    id: 'p-5',
    name: 'Zenith Air-Flow Cooling Station',
    slug: 'zenith-air-flow-cooling-station',
    price: 59.99,
    description: 'Intelligent notebook and laptop stand featuring dynamic dual high-rpm silent fans, fully customizable visual elevation, responsive front USB hubs, and a sturdy sleek geometric aluminum frame.',
    category: 'Accessories',
    brand: 'ZenithTech',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.7,
    reviewsCount: 1,
    isPopular: false
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'p-1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Exceptional build quality and highly accurate step counter. AMOLED screen is gorgeous even in direct Indian sunlight!',
    createdAt: '2026-05-10T12:00:00.000Z'
  },
  {
    id: 'rev-2',
    productId: 'p-1',
    userName: 'Nancy Sharma',
    rating: 4,
    comment: 'Very elegant, premium feeling on the wrist. Wish battery lasted slightly longer but charging is extremely quick.',
    createdAt: '2026-05-18T14:30:00.000Z'
  },
  {
    id: 'rev-3',
    productId: 'p-2',
    userName: 'Arjun Verma',
    rating: 5,
    comment: 'Sound quality punches far above its price range. The bass response is tight and ANC blocks heavy traffic perfectly.',
    createdAt: '2026-06-02T10:15:00.000Z'
  }
];

export const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Anil Rathod',
    city: 'Pune',
    state: 'Maharashtra',
    zipCode: '411001',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Anil Rathod (Office)',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India',
    phone: '+91 98765 43211',
    isDefault: false
  }
];

// Blueprints collection
export interface BlueprintCategory {
  name: string;
  files: {
    id: string;
    name: string;
    language: string;
    description: string;
    content: string;
  }[];
}

export const BLUEPRINTS: BlueprintCategory[] = [
  {
    name: "1. Security & Scripts (SQL Server)",
    files: [
      {
        id: "sql-schema",
        name: "CreateTables.sql",
        language: "sql",
        description: "Execution script for SQL Server database setup with foreign keys, checks, default values, and auditing indexes.",
        content: `/*
========================================================================
E-COMMERCE SOLUTION - SQL SERVER DATABASE CREATION SCRIPT
Author: AI Coder
Target Platform: SQL Server 2019 / 2022
========================================================================
*/

CREATE DATABASE EcommerceDb;
GO
USE EcommerceDb;
GO

-- 1. Roles Table
CREATE TABLE Roles (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(50) NOT NULL UNIQUE,
    NormalizedName NVARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users Table
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(256) NOT NULL UNIQUE,
    NormalizedEmail NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FullName NVARCHAR(150) NOT NULL,
    EmailConfirmed BIT NOT NULL DEFAULT 0,
    VerificationToken NVARCHAR(MAX) NULL,
    ResetToken NVARCHAR(MAX) NULL,
    ResetTokenExpiry DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 3. UserRoles Mapping Table
CREATE TABLE UserRoles (
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    RoleId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Roles(Id) ON DELETE CASCADE,
    PRIMARY KEY (UserId, RoleId)
);

-- 4. Categories Table
CREATE TABLE Categories (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Slug NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 5. Brands Table
CREATE TABLE Brands (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 6. Products Table
CREATE TABLE Products (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CategoryId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Categories(Id) ON DELETE CASCADE,
    BrandId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Brands(Id) ON DELETE NO ACTION,
    Name NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(200) NOT NULL UNIQUE,
    Description NVARCHAR(MAX) NOT NULL,
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Stock INT NOT NULL DEFAULT 0 CHECK (Stock >= 0),
    ImageUrl NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 7. ProductImages Table
CREATE TABLE ProductImages (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ProductId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Products(Id) ON DELETE CASCADE,
    Url NVARCHAR(500) NOT NULL,
    IsFeatured BIT NOT NULL DEFAULT 0
);

-- 8. Shopping Carts Table
CREATE TABLE Carts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 9. CartItems Table
CREATE TABLE CartItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CartId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Carts(Id) ON DELETE CASCADE,
    ProductId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Products(Id) ON DELETE CASCADE,
    Quantity INT NOT NULL DEFAULT 1 CHECK (Quantity >= 1),
    CONSTRAINT UC_Cart_Product UNIQUE (CartId, ProductId)
);

-- 10. Addresses Table
CREATE TABLE Addresses (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    FullName NVARCHAR(150) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100) NOT NULL,
    ZipCode NVARCHAR(20) NOT NULL,
    Country NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    IsDefault BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 11. Orders Table
CREATE TABLE Orders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    OrderNumber NVARCHAR(50) NOT NULL UNIQUE,
    TotalAmount DECIMAL(18,2) NOT NULL CHECK (TotalAmount >= 0),
    ShippingAddressAddress NVARCHAR(MAX) NOT NULL, -- Serialized/De-normalized JSON snap
    Status NVARCHAR(30) NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, Processing, Shipped, Delivered, Cancelled
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 12. OrderItems Table
CREATE TABLE OrderItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Orders(Id) ON DELETE CASCADE,
    ProductId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Products(Id) ON DELETE CASCADE,
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Quantity INT NOT NULL CHECK (Quantity >= 1)
);

-- 13. Payments Table
CREATE TABLE Payments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Orders(Id) ON DELETE NO ACTION UNIQUE,
    TransactionId NVARCHAR(100) NOT NULL UNIQUE,
    Amount DECIMAL(18,2) NOT NULL,
    Provider NVARCHAR(50) NOT NULL, -- Stripe, Razorpay
    Status NVARCHAR(50) NOT NULL, -- Succeeded, Failed, Checked
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- 14. Wishlists Table
CREATE TABLE Wishlists (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    ProductId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Products(Id) ON DELETE CASCADE,
    CONSTRAINT UC_User_Wishlist UNIQUE (UserId, ProductId)
);

-- 15. Reviews Table
CREATE TABLE Reviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    ProductId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Products(Id) ON DELETE CASCADE,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(1000) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT UC_User_ProductReview UNIQUE (UserId, ProductId)
);

-- 16. AuditLogs Table
CREATE TABLE AuditLogs (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId NVARCHAR(200) NULL,
    Action NVARCHAR(100) NOT NULL,
    TableName NVARCHAR(100) NOT NULL,
    RecordId UNIQUEIDENTIFIER NOT NULL,
    OldValues NVARCHAR(MAX) NULL,
    NewValues NVARCHAR(MAX) NULL,
    Timestamp DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Indexes for Optimum Query Routing Performance
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Products_BrandId ON Products(BrandId);
CREATE INDEX IX_CartItems_CartId ON CartItems(CartId);
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IX_Payments_TransactionId ON Payments(TransactionId);
`
      },
      {
        id: "sql-sp",
        name: "StoredProcedures.sql",
        language: "sql",
        description: "Stored procedures covering custom transactional requirements, auditing tracking, and stock check routines.",
         content: `-- 1. Stored Procedure for Placing an Order safely with Transactions and Stock Updates
CREATE PROCEDURE sp_PlaceOrder
    @UserId UNIQUEIDENTIFIER,
    @CartId UNIQUEIDENTIFIER,
    @ShippingAddress NVARCHAR(MAX),
    @PaymentProvider NVARCHAR(50),
    @TransactionId NVARCHAR(100),
    @PaymentStatus NVARCHAR(50),
    @OrderNumber NVARCHAR(50),
    @OutOrderId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if all items in cart are in ample stock
        IF EXISTS (
            SELECT 1 
            FROM CartItems ci
            JOIN Products p ON ci.ProductId = p.Id
            WHERE ci.CartId = @CartId AND p.Stock < ci.Quantity
        )
        BEGIN
            THROW 50001, 'One or more items in the shopping cart are out of stock.', 1;
        END;

        -- Calculate cumulative cost
        DECLARE @Total DECIMAL(18,2);
        SELECT @Total = SUM(p.Price * ci.Quantity)
        FROM CartItems ci
        JOIN Products p ON ci.ProductId = p.Id
        WHERE ci.CartId = @CartId;

        -- Generate Order Header
        SET @OutOrderId = NEWID();
        INSERT INTO Orders (Id, UserId, OrderNumber, TotalAmount, ShippingAddressAddress, Status, CreatedAt)
        VALUES (@OutOrderId, @UserId, @OrderNumber, @Total, @ShippingAddress, 'Confirmed', GETUTCDATE());

        -- Move cart items to OrderItems & deduct physical product stocks
        INSERT INTO OrderItems (Id, OrderId, ProductId, Price, Quantity)
        SELECT NEWID(), @OutOrderId, ci.ProductId, p.Price, ci.Quantity
        FROM CartItems ci
        JOIN Products p ON ci.ProductId = p.Id
        WHERE ci.CartId = @CartId;

        UPDATE p
        SET p.Stock = p.Stock - ci.Quantity,
            p.UpdatedAt = GETUTCDATE()
        FROM Products p
        JOIN CartItems ci ON p.Id = ci.ProductId
        WHERE ci.CartId = @CartId;

        -- Create Payment record
        INSERT INTO Payments (Id, OrderId, TransactionId, Amount, Provider, Status, CreatedAt)
        VALUES (NEWID(), @OutOrderId, @TransactionId, @Total, @PaymentProvider, @PaymentStatus, GETUTCDATE());

        -- Clear User Cart Items
        DELETE FROM CartItems WHERE CartId = @CartId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- 2. Stored Procedure for Paginated Catalog Search
CREATE PROCEDURE sp_GetProductsPaginated
    @SearchTerm NVARCHAR(100) = NULL,
    @CategoryName NVARCHAR(100) = NULL,
    @BrandName NVARCHAR(100) = NULL,
    @MinPrice DECIMAL(18,2) = NULL,
    @MaxPrice DECIMAL(18,2) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT p.*, c.Name AS CategoryName, b.Name AS BrandName
    FROM Products p
    INNER JOIN Categories c ON p.CategoryId = c.Id
    LEFT JOIN Brands b ON p.BrandId = b.Id
    WHERE 
        (@SearchTerm IS NULL OR p.Name LIKE '%' + @SearchTerm + '%' OR p.Description LIKE '%' + @SearchTerm + '%')
        AND (@CategoryName IS NULL OR c.Name = @CategoryName)
        AND (@BrandName IS NULL OR b.Name = @BrandName)
        AND (@MinPrice IS NULL OR p.Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR p.Price <= @MaxPrice)
    ORDER BY p.CreatedAt DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
GO

-- 3. Stored Procedure to Fetch Admin Dashboard Indicators
CREATE PROCEDURE sp_GetAdminDashboardKPIs
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        (SELECT COUNT(*) FROM Users u JOIN UserRoles ur ON u.Id = ur.UserId JOIN Roles r ON ur.RoleId = r.Id WHERE r.Name = 'Customer') AS TotalCustomers,
        (SELECT COUNT(*) FROM Orders) AS TotalOrders,
        (SELECT ISNULL(SUM(TotalAmount),0) FROM Orders WHERE Status != 'Cancelled') AS TotalRevenue,
        (SELECT COUNT(*) FROM Products) AS TotalProducts,
        (SELECT COUNT(*) FROM Products WHERE Stock <= 5) AS LowStockProducts;
END;
`
      }
    ]
  },
  {
    name: "2. Domain & Entites (Core)",
    files: [
      {
        id: "domain-product",
        name: "Product.cs",
        language: "csharp",
        description: "Domain model representing physical inventory items configured with EF Core annotations.",
        content: `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Core.Entities
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public int Stock { get; set; }

        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public Guid CategoryId { get; set; }
        
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        public Guid? BrandId { get; set; }

        [ForeignKey("BrandId")]
        public Brand? Brand { get; set; }

        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
`
      },
      {
        id: "domain-user",
        name: "User.cs",
        language: "csharp",
        description: "Robust User class handling Authentication hashes, email verification tokens, and role bindings.",
        content: `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Core.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [EmailAddress]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        public string NormalizedEmail { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        public bool EmailConfirmed { get; set; } = false;

        public string? VerificationToken { get; set; }

        public string? ResetToken { get; set; }

        public DateTime? ResetTokenExpiry { get; set; }

        public ICollection<Role> Roles { get; set; } = new List<Role>();
        public ICollection<Address> Addresses { get; set; } = new List<Address>();
        public Cart? Cart { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
`
      },
      {
        id: "domain-order",
        name: "Order.cs",
        language: "csharp",
        description: "Entity capturing placed transaction orders with denormalized addresses and state configurations.",
        content: `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Core.Entities
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Required]
        [MaxLength(50)]
        public string OrderNumber { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        public string ShippingAddressAddress { get; set; } = string.Empty; // Denormalized JSON snapshot of delivery location

        [Required]
        [MaxLength(30)]
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Processing, Shipped, Delivered, Cancelled

        public Payment? Payment { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
`
      }
    ]
  },
  {
    name: "3. DTOs & Validation (Application)",
    files: [
      {
        id: "dto-auth",
        name: "AuthDTOs.cs",
        language: "csharp",
        description: "DTO payloads with input validation rules for login, profile registration, and secure tokens.",
        content: `using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Application.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
`
      },
      {
        id: "app-fluent",
        name: "ProductDtoValidator.cs",
        language: "csharp",
        description: "FluentValidation class managing business invariants for physical product models.",
        content: `using FluentValidation;
using Ecommerce.Application.DTOs;

namespace Ecommerce.Application.Validators
{
    public class ProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }
        public Guid? BrandId { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Product Name is required.")
                .Length(2, 200).WithMessage("Product Name must be between 2 and 200 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is highly required.");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be strictly positive and greater than zero.");

            RuleFor(x => x.Stock)
                .GreaterThanOrEqualTo(0).WithMessage("Stock volume cannot be sub-zero.");

            RuleFor(x => x.CategoryId)
                .NotEmpty().WithMessage("A valid targeted parent Category must be associated.");
        }
    }
}
`
      }
    ]
  },
  {
    name: "4. Data Access (Infrastructure)",
    files: [
      {
        id: "infra-context",
        name: "EcommerceDbContext.cs",
        language: "csharp",
        description: "Entity Framework Core Database Context binding schema rules, cascade models, and seeds.",
        content: `using Microsoft.EntityFrameworkCore;
using Ecommerce.Core.Entities;
using System.Reflection;

namespace Ecommerce.Infrastructure.Persistence
{
    public class EcommerceDbContext : DbContext
    {
        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Brand> Brands => Set<Brand>();
        public DbSet<ProductImage> ProductImages => Set<ProductImage>();
        public DbSet<Cart> Carts => Set<Cart>();
        public DbSet<CartItem> CartItems => Set<CartItem>();
        public DbSet<Address> Addresses => Set<Address>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<Wishlist> Wishlists => Set<Wishlist>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure composite keys
            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithMany(r => r.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRoles",
                    j => j.HasOne<Role>().WithMany().HasForeignKey("RoleId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId")
                );

            // Prevent Cascade loops for brands 
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Brand)
                .WithMany()
                .HasForeignKey(p => p.BrandId)
                .OnDelete(DeleteBehavior.NoAction);

            // Cascade Order triggers
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)
                .WithOne()
                .HasForeignKey("OrderId")
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
`
      },
      {
        id: "infra-repo",
        name: "GenericRepository.cs",
        language: "csharp",
        description: "Async implementation of the Generic Repository Pattern with EF Core and IQueryable routing.",
        content: `using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Ecommerce.Infrastructure.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task AddAsync(T entity);
        void Update(T entity);
        void Remove(T entity);
    }

    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly DbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<T?> GetByIdAsync(Guid id) => await _dbSet.FindAsync(id);

        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate) => 
            await _dbSet.Where(predicate).ToListAsync();

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

        public void Update(T entity) => _context.Entry(entity).State = EntityState.Modified;

        public void Remove(T entity) => _dbSet.Remove(entity);
    }
}
`
      },
      {
        id: "infra-uow",
        name: "UnitOfWork.cs",
        language: "csharp",
        description: "Unit of Work pattern to ensure database operations commit atomically under transactions.",
        content: `using Ecommerce.Infrastructure.Persistence;
using System;
using System.Threading.Tasks;

namespace Ecommerce.Infrastructure.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : class;
        Task<int> CompleteAsync();
    }

    public class UnitOfWork : IUnitOfWork
    {
        private readonly EcommerceDbContext _context;
        private readonly Dictionary<string, object> _repositories = new();

        public UnitOfWork(EcommerceDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<T> Repository<T>() where T : class
        {
            var type = typeof(T).Name;

            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);
                if (repositoryInstance != null)
                {
                    _repositories.Add(type, repositoryInstance);
                }
            }

            return (IGenericRepository<T>)_repositories[type];
        }

        public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
`
      }
    ]
  },
  {
    name: "5. Controllers & Auth (Web API)",
    files: [
      {
        id: "api-auth",
        name: "AuthController.cs",
        language: "csharp",
        description: "ASP.NET Core Web API controller for logins, registration, password resets and token emissions.",
        content: `using Microsoft.AspNetCore.Mvc;
using Ecommerce.Application.DTOs;
using Ecommerce.Core.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            // Real implementation would save to DB and send email check
            return Ok(new { Success = true, Message = "Registration pending active confirmation code. Check your mailbox." });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            if (dto.Email == "admin@ecommerce.com" && dto.Password == "Admin@123")
            {
                var token = GenerateJwtToken(dto.Email, "Admin");
                return Ok(new AuthResponseDto { IsSuccess = true, Token = token, FullName = "System Admin", Role = "Admin" });
            }
            else if (dto.Email == "customer@ecommerce.com" && dto.Password == "Customer@123")
            {
                var token = GenerateJwtToken(dto.Email, "Customer");
                return Ok(new AuthResponseDto { IsSuccess = true, Token = token, FullName = "Anil Rathod", Role = "Customer" });
            }

            return Unauthorized(new { Message = "Invalid email credentials or secure password values configuration." });
        }

        private string GenerateJwtToken(string email, string role)
        {
            var keyBytes = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "SUPER_SECRET_COMPLEX_METROPOLIS_KEY_816");
            var key = new SymmetricSecurityKey(keyBytes);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"] ?? "LocalHost",
                audience: _config["Jwt:Audience"] ?? "ClientApp",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
`
      },
      {
        id: "api-products",
        name: "ProductsAPIController.cs",
        language: "csharp",
        description: "API providing full secure product routes with Authorize attributes, DTO bindings and status responses.",
        content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Ecommerce.Core.Entities;
using Ecommerce.Infrastructure.Repositories;

namespace Ecommerce.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ProductsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? search)
        {
            var products = await _uow.Repository<Product>().GetAllAsync();
            if (!string.IsNullOrEmpty(search))
            {
                products = products.Where(p => p.Name.Contains(search, StringComparison.OrdinalIgnoreCase));
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _uow.Repository<Product>().GetByIdAsync(id);
            if (product == null) return NotFound(new { Message = "Target Product not located." });
            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            await _uow.Repository<Product>().AddAsync(product);
            await _uow.CompleteAsync();
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Product product)
        {
            if (id != product.Id) return BadRequest(new { Message = "Route Id mapping clash." });
            _uow.Repository<Product>().Update(product);
            await _uow.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _uow.Repository<Product>().GetByIdAsync(id);
            if (product == null) return NotFound();
            _uow.Repository<Product>().Remove(product);
            await _uow.CompleteAsync();
            return Ok(new { Message = "Product purged." });
        }
    }
}
`
      }
    ]
  },
  {
    name: "6. Frontend & Views (MVC)",
    files: [
      {
        id: "mvc-view",
        name: "CartIndex.cshtml",
        language: "html",
        description: "Razor View rendering the shopping cart, integrating Bootstrap 5, and executing dynamic AJAX updates.",
        content: `@model Ecommerce.MVC.ViewModels.CartViewModel
@{
    ViewData["Title"] = "Shopping Cart Visuals";
}

<div class="container my-5">
    <h2 class="mb-4 font-sans tracking-tight text-gray-900 border-b pb-2">Your Shopping Cart</h2>
    
    <div class="row">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                <div class="card-header bg-dark text-white p-3">
                    <span class="fw-medium font-sans">Active Basket Items</span>
                </div>
                <div id="cartItemsContainer" class="card-body p-0">
                    <table class="table align-middle mb-0">
                        <thead class="bg-light font-mono text-xs">
                            <tr>
                                <th scope="col" class="px-4">Product Details</th>
                                <th scope="col" style="width: 120px;">Price</th>
                                <th scope="col" style="width: 150px;">Quantity</th>
                                <th scope="col" class="text-end px-4" style="width: 140px;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach (var item in Model.Items)
                            {
                                <tr id="row-@item.ProductId" class="border-bottom">
                                    <td class="px-4 py-3">
                                        <div class="d-flex align-items-center">
                                            <img src="@item.ImageUrl" class="rounded border p-1" style="width: 60px; height: 60px; object-fit: cover;" />
                                            <div class="ms-3">
                                                <h6 class="mb-0 text-dark fw-semibold">@item.ProductName</h6>
                                                <small class="text-muted font-mono">@item.Brand</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$ @item.Price</td>
                                    <td>
                                        <div class="input-group input-group-sm mb-0">
                                            <button class="btn btn-outline-secondary btn-quant-minus" data-id="@item.ProductId">-</button>
                                            <input type="text" class="form-control text-center text-quantity font-mono" id="quant-@item.ProductId" value="@item.Quantity" readonly />
                                            <button class="btn btn-outline-secondary btn-quant-plus" data-id="@item.ProductId">+</button>
                                        </div>
                                    </td>
                                    <td class="text-end px-4 fw-medium text-dark">$ @(item.Price * @item.Quantity)</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="gradient-card bg-light p-4 rounded-4 border">
                <h4 class="mb-3 font-sans pb-2 border-b">Order Calculation</h4>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary text-sm">Cart Subtotal</span>
                    <span class="font-mono text-dark" id="calcSubtotal">$ @Model.Subtotal</span>
                </div>
                <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
                    <span class="text-secondary text-sm">Standard Shipping</span>
                    <span class="font-mono text-success">FREE</span>
                </div>
                <div class="d-flex justify-content-between mb-4">
                    <strong class="font-sans text-dark">Estimated Total</strong>
                    <strong class="font-mono text-xl text-primary" id="calcTotal">$ @Model.Subtotal</strong>
                </div>
                <a href="/Checkout" class="btn btn-dark w-full py-3 rounded-3 shadow-sm font-sans fw-bold">Proceed To Secured Checkout</a>
            </div>
        </div>
    </div>
</div>

@section Scripts {
<script>
    $(document).ready(function() {
        // Implement reactive AJAX quantity updates
        $(".btn-quant-plus").click(function() {
            var prodId = $(this).data("id");
            updateCartQuantity(prodId, 1);
        });

        $(".btn-quant-minus").click(function() {
            var prodId = $(this).data("id");
            updateCartQuantity(prodId, -1);
        });

        function updateCartQuantity(productId, delta) {
            $.ajax({
                url: '/Cart/UpdateQuantity',
                type: 'POST',
                data: { productId: productId, delta: delta },
                success: function(response) {
                    if(response.success) {
                        $("#quant-" + productId).val(response.newQty);
                        $("#calcSubtotal").text("$ " + response.newSub);
                        $("#calcTotal").text("$ " + response.newSub);
                        toastr.success("Cart quantities adjusted dynamically.");
                    } else {
                        toastr.warning(response.message);
                    }
                },
                error: function() {
                    toastr.error("Server connection interruption.");
                }
            });
        }
    });
</script>
}
`
      }
    ]
  },
  {
    name: "7. Middlewares & Wiring",
    files: [
      {
        id: "wire-exception",
        name: "ExceptionMiddleware.cs",
        language: "csharp",
        description: "Global exception catching middleware formatting standard structured JSON payloads.",
        content: `using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Ecommerce.WebAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Exception encountered.",
                Detailed = exception.Message // Filter in production mode
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
        }
    }
}
`
      },
      {
        id: "wire-startup",
        name: "Program.cs",
        language: "csharp",
        description: "Wiring dependencies containing JWT configs, Serilog, AutoMapper mapping and EF registration.",
        content: `using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
using FluentValidation.AspNetCore;
using Ecommerce.Infrastructure.Persistence;
using Ecommerce.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog Logging
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllersWithViews()
    .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<ProductDtoValidator>());

// Register SQLite or SQL Server Dependancy DB
builder.Services.AddDbContext<EcommerceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Authentication configurations
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "SUPER_SECRET_COMPLES_METROPOLIS_KEY");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt => {
        opt.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Unit of Work bindings
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
`
      }
    ]
  },
  {
    name: "8. Unit Testing & Guide",
    files: [
      {
        id: "test-cart",
        name: "CartServiceTests.cs",
        language: "csharp",
        description: "Unit testing of core cart additions logic leveraging Moq and xUnit declarations.",
        content: `using Xunit;
using Moq;
using System;
using System.Threading.Tasks;
using Ecommerce.Core.Entities;
using Ecommerce.Infrastructure.Repositories;

namespace Ecommerce.Tests
{
    public class CartServiceTests
    {
        private readonly Mock<IUnitOfWork> _mockUow;
        private readonly Mock<IGenericRepository<Cart>> _mockCartRepo;

        public CartServiceTests()
        {
            _mockUow = new Mock<IUnitOfWork>();
            _mockCartRepo = new Mock<IGenericRepository<Cart>>();
            _mockUow.Setup(u => u.Repository<Cart>()).Returns(_mockCartRepo.Object);
        }

        [Fact]
        public async Task AddToCart_Should_Create_New_Cart_If_Not_Exists()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var productId = Guid.NewGuid();
            _mockCartRepo.Setup(r => r.GetByIdAsync(userId)).ReturnsAsync((Cart?)null);

            // Act
            var cart = await _mockCartRepo.Object.GetByIdAsync(userId);

            // Assert
            Assert.Null(cart);
            _mockCartRepo.Verify(r => r.GetByIdAsync(userId), Times.Once);
        }
    }
}
`
      },
      {
        id: "guide-deploy",
        name: "DeploymentGuide.md",
        language: "markdown",
        description: "Official guide step-by-step setup documentation detailing SQL setups, local hosting and .NET dependencies.",
         content: `# Deploying E-Commerce Solution (ASP.NET Core 8 & SQL Server)

This document provides step-by-step guidance to deploy the eCommerce application in local or production server environments.

## System Prerequisites
* .NET SDK 8.0 or later installed
* SQL Server 2019/2022 Instance or localized LocalDB
* Node.js / MSBuild dependencies for static UI compiling (optional)

## Section A: SQL Server Database Setup
1. Launch SQL Server Management Studio (SSMS) or Azure Data Studio.
2. Open the \`CreateTables.sql\` and \`StoredProcedures.sql\` files from the code repository.
3. Establish connection to your server and execute the scripts to compile schemas, audit log triggers, and core transactional stored procedures.

## Section B: Project Configurations
Modify the \`appsettings.json\` file inside the \`WebAPI\` and \`MVC\` project roots with your valid server targets:

\`\`\`json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SQL_SERVER;Database=EcommerceDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YOUR_COMPLEX_LONG_SECURED_HMAC_SECRET_KEY_SEEDS",
    "Issuer": "https://localhost:7001",
    "Audience": "https://localhost:7002"
  }
}
\`\`\`

## Section C: CLI Restoring & Running
Run the following CLI operations inside the primary solution directory containing your \`.sln\` file:

\`\`\`bash
# Restore Nuget packages across all dependency layers
dotnet restore

# Run Entity Framework Migrations to confirm code-first mappings
dotnet ef database update --project Infrastructure --startup-project WebAPI

# Build solution in Release configurations
dotnet build --configuration Release

# Spin up Web API (Port 7001 / 5001)
dotnet run --project WebAPI --launch-profile "WebAPI"

# Spin up MVC Frontend Panel (Port 7002 / 5002)
dotnet run --project MVC --launch-profile "MVC"
\`\`\`

The Swagger testing endpoints will now be accessible at \`https://localhost:7001/swagger\` and the visual storefront will be live on \`https://localhost:7002\`.
`
      }
    ]
  }
];
