import { Arg, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

import { Payload } from "./models";
import { PayloadService } from "./services";

@Resolver(Payload)
export class PayloadResolver {
    @Inject()
    private payloadService: PayloadService;

    @Query(returns => Payload)
    payload(
      @Arg("databaseId") databaseId: number,
      @Arg("column", { nullable: true }) column?: string,
      @Arg("filter", { nullable: true }) filter?: string,
      @Arg("value", { nullable: true }) value?: string
    ) {
        return this.payloadService.fetchPayload(databaseId, column, filter, value);
    }
}
