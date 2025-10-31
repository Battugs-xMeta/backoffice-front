import React, { useState } from "react";
import InitTableHeader from "../table-header";
import { UserBankAccountWalletsTypeEnum } from "services/bank-accounts/types";
import { UserBankDepositTypeEnum } from "services/bank-deposits/types";
import { BANK_ACCOUNT_FILTER_OPTIONS, BANK_DEPOSIT_FILTER_OPTIONS } from "./options";

// Example 1: Bank Accounts with filter
export const BankAccountsExample: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<UserBankAccountWalletsTypeEnum>(
    UserBankAccountWalletsTypeEnum.DefaultFilterByUser
  );

  const handleFilterApply = (filterType: UserBankAccountWalletsTypeEnum) => {
    setCurrentFilter(filterType);
    // Make API call with selected filter
    console.log("Bank Account filter applied:", filterType);
  };

  return (
    <InitTableHeader
      customHeaderTitle="Bank Accounts"
      hideFormFilter={false}
      onFilterApply={handleFilterApply}
      filterOptions={BANK_ACCOUNT_FILTER_OPTIONS}
      filterTitle="Filter Bank Accounts"
      defaultFilterValue={currentFilter}
      refresh={() => console.log("Refreshing...")}
    />
  );
};

// Example 2: Bank Deposits with filter  
export const BankDepositsExample: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<UserBankDepositTypeEnum>(
    UserBankDepositTypeEnum.BankDepositTypeQuery
  );

  const handleFilterApply = (filterType: UserBankDepositTypeEnum) => {
    setCurrentFilter(filterType);
    // Make API call with selected filter
    console.log("Bank Deposit filter applied:", filterType);
  };

  return (
    <InitTableHeader
      customHeaderTitle="Bank Deposits"
      hideFormFilter={false}
      onFilterApply={handleFilterApply}
      filterOptions={BANK_DEPOSIT_FILTER_OPTIONS}
      filterTitle="Filter Bank Deposits"
      defaultFilterValue={currentFilter}
      refresh={() => console.log("Refreshing...")}
    />
  );
};

// Example 3: Custom enum with filter
enum CustomFilterEnum {
  Option1 = "option1",
  Option2 = "option2", 
  Option3 = "option3",
}

const CUSTOM_FILTER_OPTIONS = [
  { label: "Option 1", value: CustomFilterEnum.Option1 },
  { label: "Option 2", value: CustomFilterEnum.Option2 },
  { label: "Option 3", value: CustomFilterEnum.Option3 },
];

export const CustomFilterExample: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<CustomFilterEnum>(
    CustomFilterEnum.Option1
  );

  const handleFilterApply = (filterType: CustomFilterEnum) => {
    setCurrentFilter(filterType);
    console.log("Custom filter applied:", filterType);
  };

  return (
    <InitTableHeader
      customHeaderTitle="Custom Table"
      hideFormFilter={false}
      onFilterApply={handleFilterApply}
      filterOptions={CUSTOM_FILTER_OPTIONS}
      filterTitle="Custom Filters"
      defaultFilterValue={currentFilter}
      refresh={() => console.log("Refreshing...")}
    />
  );
};