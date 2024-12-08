import Input from "../input/Input";
import Button from "../button/Button";

const RegisterForm = () => {
    return (
        <>
            <p className="text-[13px] leading-[16px] font-[400] mb-[12px]">
                Enter your email and password to register.
            </p>
            <div className="flex flex-col gap-4">
                <Input
                    type={"text"}
                    required={true}
                    name={"firstName"}
                    placeholder="Enter your name"
                />
                <Input
                    type={"email"}
                    required={true}
                    name={"email"}
                    placeholder="Enter your email"
                />
                <Input
                    type={"password"}
                    required={true}
                    name={"password"}
                    placeholder="Enter your password"
                />
                <Input
                    type={"password"}
                    required={true}
                    name={"confirm"}
                    placeholder="Confirm your password"
                />
                <Button
                    title="Register"
                    type="submit"
                    className="w-full flex items-center justify-center mt-[41px]"
                />
            </div>
        </>
    );
};

export default RegisterForm;
