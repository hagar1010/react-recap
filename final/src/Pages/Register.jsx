// import { logInAndRegisterSchema } from "@/forms/schema";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerAPI } from "@/api/auth";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(logInAndRegisterSchema),
//   });
//   const onSubmit = async (data) => {
//     try {
//       await registerAPI(data);

//       navigate("/login");
//     } catch (e) {
//       console.error(e);
//     } finally {
//       reset();
//     }
//   };
//   return (
//     <div className="text-center">
//       <h2>Register Page (Form goes here)</h2>
//       <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="">
//             <label htmlFor="email">Email :</label>{" "}
//             <input id="email" type="email" {...register("email", {})} />
//             <p style={{ color: "orange" }}>{errors?.email?.message}</p>
//           </div>

//           <div className="">
//             <label htmlFor="password">Password :</label>{" "}
//             <input type="password" {...register("password", {})} />
//             <p style={{ color: "orange" }}>{errors?.password?.message}</p>
//           </div>
//           <div className="">
//             <input type="submit" value="create my user" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { registerSchema } from "@/forms/schema"; // ✅ Correct schema
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerAPI(data);
      navigate("/login");
    } catch (e) {
      console.error(e);
      setError("Registration failed. Please try again.");
    } finally {
      reset();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded shadow-sm mt-4">
      <h2 className="text-center h4 mb-4">Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name */}
        <div>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="e.g. John Doe"
            {...register("name")}
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>

        {/* Username */}
        <div>
          <label className="form-label">Username</label>
          <input
            className="form-control"
            placeholder="e.g. johndoe123"
            {...register("username")}
          />
          {errors.username && <small className="text-danger">{errors.username.message}</small>}
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            placeholder="e.g. 01012345678"
            {...register("phone")}
          />
          {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>

        {/* Email */}
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="e.g. john@example.com"
            {...register("email")}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>

        {/* Password */}
        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Choose a strong password"
            {...register("password")}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>

        {error && <div className="text-danger text-center">{error}</div>}

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
