# Session 3: Cairo Deep Dive — Tasks & Assignments

This folder contains the assignments for **Session 3** of the Cairo Deep Dive class.  
The tasks were designed to reinforce key Cairo concepts such as memory management, data structures, and control flow through practical coding exercises.

---

## 📋 Assignments

### 1. Complete Starklings Challenges (Up to Starknet Section)

- Solve Starklings exercises until the **Starknet** module.
- Focus on memory, functions, arrays, structs, enums, and control flow.
- Purpose: To solidify core Cairo skills through guided challenges.

### 2. Implement a Car Registry System

Build a simple **Car Registry System** in Cairo that demonstrates the use of:

- **Dictionaries** → To map car IDs/owners to data.
- **Structs** → To define the car model (e.g., brand, year, owner).
- **Tuples** → For lightweight grouped values.
- **Enums** → To model different car states (e.g., Available, Sold, InMaintenance).
- **Functions with Control Flow** → To perform operations such as registering a car, transferring ownership, or updating status.

---

## 🛠️ Expected Features in Car Registry

- `register_car(id, car_struct)` → Adds a new car to the registry.
- `update_owner(id, new_owner)` → Transfers ownership.
- `update_status(id, status_enum)` → Updates the car’s state.
- `get_car(id)` → Fetches car details.

The implementation should also demonstrate:

- Conditional logic (`if`/`match`) to check for existing cars.
- Use of **traits/generics** where possible for cleaner abstractions.

---
