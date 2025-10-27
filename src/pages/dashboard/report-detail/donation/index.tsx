import { FormList } from "./form";
import { SpendList } from "./spend";

export const DonationList = () => {
  return (
    <div className="space-y-6 mt-6">
      <FormList />
      <SpendList />
    </div>
  );
};
