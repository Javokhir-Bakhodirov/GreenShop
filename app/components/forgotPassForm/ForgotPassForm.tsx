import Input from "../input/Input";
import Button from "../button/Button";

const ForgotPassForm = () => {
    return (
        <>
            <p className="text-[13px] leading-[16px] font-[400] mb-[12px]">
                forgot pass
            </p>
            <div className="flex flex-col gap-4">
                <Input
                    type={"email"}
                    required={true}
                    name={"email"}
                    placeholder="Enter your email"
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

export default ForgotPassForm;
