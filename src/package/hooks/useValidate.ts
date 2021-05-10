import {Validator, ValidatorResult} from "../../types";
import {useCallback, useMemo, useState} from "react";
import {toKeys} from "../utils";

export function useValidate<Form>({validator}: { validator?: Validator<Form> }, [data, ...deps]: any[]) {
  const [errorMap, setErrorMap] = useState<ValidatorResult<Form>>(toKeys(data));
  // 这个valid不是实时的
  const valid = useMemo(() => {
    if (!validator) return true;
    return !Object.values(errorMap).some(Boolean);
  }, [errorMap]);

  // 该函数的返回值是最新的valid
  const validate = useCallback(async () => {
    if (!validator) return true;
    const error = await validator(data);
    setErrorMap(error);
    return !Object.values(error).some(Boolean);
  }, [data]);

  return {
    valid,
    errorMap,
    validate
  };
}
