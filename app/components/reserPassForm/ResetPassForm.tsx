import Input from "../input/Input";
import Button from "../button/Button";

const ResetPassForm = () => {
    return (
        <>
            <p className="text-[13px] leading-[16px] font-[400] mb-[12px]">
                RESET PASSWORD
            </p>
            <div className="flex flex-col gap-4">
                <Input
                    type={"password"}
                    required={true}
                    name={"new_password"}
                    placeholder="Enter your password"
                />
                <Input
                    type={"number"}
                    required={true}
                    name={"otp"}
                    placeholder="code from Email address"
                />
                <Button
                    title="Reset Password"
                    type="submit"
                    className="w-full flex items-center justify-center mt-[41px]"
                />
            </div>
        </>
    );
};

export default ResetPassForm;
