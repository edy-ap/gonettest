package us.gonet.test;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("us.gonet.test");

        noClasses()
            .that()
                .resideInAnyPackage("us.gonet.test.service..")
            .or()
                .resideInAnyPackage("us.gonet.test.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..us.gonet.test.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
