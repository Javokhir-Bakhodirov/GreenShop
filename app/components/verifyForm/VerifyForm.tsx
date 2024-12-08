import Input from "../input/Input";
import Button from "../button/Button";

const VerifyForm = () => {
    return (
        <>
            <p className="text-[13px] leading-[16px] font-[400] mb-[12px]">
                Please enter the code below to verify your email address and
                continue.
            </p>
            <div className="flex flex-col gap-4">
                <Input
                    type={"number"}
                    required={true}
                    name={"code"}
                    placeholder="Enter verify code"
                />
                <Button
                    title="Verify"
                    type="submit"
                    className="w-full flex items-center justify-center mt-[41px]"
                />
            </div>
        </>
    );
};

export default VerifyForm;
